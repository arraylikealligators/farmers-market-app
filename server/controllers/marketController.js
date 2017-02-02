var Market = require('../model/farmModel.js');
var Q = require('q');
var rp = require('request-promise');
var MarketQuery = require('../methods/marketMethods');
var util = require('../util/util_functions');
var api = require('../../API_KEYS');
var zip = require('../model/zipModel');
var Promise = require("bluebird");
var fetcher = require('../../Database_Data/fetchFarmersMarketData');
var getAllFarms = Q.nbind(Market.find, Market);
var queryMarkets = Q.nbind(Market.find, Market);
var queryById = Q.nbind(Market.findById, Market);
var findAndUpdate = Q.nbind(Market.update, Market);
var findAndRemove = Q.nbind(Market.remove, Market);
var createMarket = Q.nbind(Market.create, Market);
var zipQuery = Q.nbind(zip.find, zip);

module.exports = {
	allMarkets: function(req, res, next){
		console.log("allMarkets....")
		getAllFarms({})
		  .then(function(farms){
		  	res.json(farms)
		  })
		  .fail(function(error){
		  	next(error);
		  });
	},

	getLocationMarkets: (req, res, next) => {
		var address = util.replaceSpaceInAddress(req.query.address);
    // console.log('inside getLocationMarkets controller', address);
    var radius = util.convertMilesToKm(req.query.radius);
    console.log('here is the radius', radius)

		rp.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`
		).then((data) => {
			var userZip
			JSON.parse(data).results[0].address_components.find((item) => {
				if (item.types[0] === 'postal_code') {
					userZip = item.long_name;
				}
			})
			var coordinates = JSON.parse(data).results[0].geometry.location;
			console.log('successfully got geocode' + coordinates );
			zipQuery({Zip:userZip})
			.then((result) => {
				if(result.length === 0) {
				zip.collection.insert({Zip:userZip})
				.then(() => {
					console.log('here in market controller')
					fetcher.fetchAllData(userZip,coordinates, radius, res, (coordinates, radius, res) => {
						console.log(coordinates)
						marketLocation(coordinates, radius, res)
					})
				})
				} else {
					marketLocation(coordinates, radius, res)
				}
			})
		
			// var marketsDetails = MarketQuery.fetchMarkets(coordinates);
		
			// marketsDetails.then((markets)=> {
			// 	console.log("marketsDetails in da club", marketsDetails)
			// 	console.log(typeof marketsDetails, marketsDetails, "back in the controller");
			// 	res.send(markets)})
			// console.log(typeof marketsDetails, marketsDetails, "back in the controller");
   //    	res.send(marketsDetails);
		});
		// some function to get a list of farms that match the DB query


		// send the query result to front-end as res.json()
	},

  addMarket: (req, res, next) => {
    console.log("req.body", req.body);
    console.log("geo coords", req.body.geometry);
    Market.create({ Address: req.body.market.Address,
        GoogleLink: req.body.market.Link,
        Products: req.body.market.Products,
        Schedule: req.body.market.Schedule,
        Name: req.body.market.Name,
        geometry: req.body.market.geometry }, 
        function(err, newMarket){
          if(err){
            console.log("Error creating object!", err);
            res.send("error creating object!");
          }else{
            Market.collection.createIndex( { geometry : "2dsphere" } );
            res.send(newMarket);
            
          }
   });
  },
        //may not be necessary
        
  

  fetchOne: (req, res) => {
  	console.log("above fetch");
  	console.log(req.body.marketId);
  	queryById(req.body.marketId)
  		.then((doc)=>{ console.log( "in fetch one", doc); 
  		  res.send(doc); 
  		})
  		.catch((err)=>{ 
  			console.log(err);
  			res.send('not found');
  		});
  },
  

  updateOne: (req, res) =>{
  	console.log("put request through to 'updateOne' func in market controller");
  	console.log("obj received: ", req.body.updatedObj.data);
  	console.log(req.body.updatedObj.data._id, "id"); 
  	console.log(typeof req.body.updatedObj.data.geometry.coordinates);
  	findAndUpdate({ _id: req.body.updatedObj.data._id},
  		{ '$set': { 'Address': req.body.updatedObj.data.Address,
  				  'Products': req.body.updatedObj.data.Products,
  				  'Schedule': req.body.updatedObj.data.Schedule,
  				  'Name': req.body.updatedObj.data.Name,
  				  'GoogleLink': req.body.updatedObj.data.GoogleLink,
  				  'geometry.coordinates' : req.body.updatedObj.data.geometry.coordinates
  				  }
  		},
  		()=> { res.send("updated");
  	})
  },

  delete: (req, res) => {
  	console.log(req.body, "req.body!!")
  	findAndRemove({ _id: req.body.market.data._id},
  		()=>{ res.send("item removed"); });
  }


};

function marketLocation (coordinates, radius, res) {
		var lng = Number(coordinates.lng);
		    var lat = Number(coordinates.lat);
		   console.log("typeof lng,", typeof lng, typeof lat, lng)
		    var marketsDetails;
		    queryMarkets(

				   {
				     geometry: {
				        $nearSphere: {
				           $geometry: {
				              type : "Point",
				              coordinates : [ lng, lat ]
				           },
				           $minDistance: 0,
				           $maxDistance: radius || 1609.3 //distance must be in meters
				        }
				     }
				   }

		    //   {loc: { $geoWithin: { $centerSphere: [ [ lng, lat ], 15/3963.2 ] } } }
		    )
		    .then((markets) => {
		      marketsDetails = markets;
		      // console.log('successful query to mongoDB for markets', marketsDetails, typeof marketsDetails);
		      res.json(marketsDetails);
		    })
		    .catch((err) => {
		      console.error('Failed', err);
		    });

}