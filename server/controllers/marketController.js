var Market = require('../model/farmModel.js');
var Q = require('q');
var rp = require('request-promise');
var MarketQuery = require('../methods/marketMethods');
var getAllFarms = Q.nbind(Market.find, Market);
var queryMarkets = Q.nbind(Market.find, Market);

var replaceSpaceInAddress = (address) => {
  return address.split(' ').join('+');
}

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
		var ad = replaceSpaceInAddress('1216 Broadway New York, NY'); //req.body
    // console.log('inside getLocationMarkets controller', req);
		var address = replaceSpaceInAddress(ad);
		rp.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`
		).then((data) => {
			var coordinates = JSON.parse(data).results[0].geometry.location;
			console.log('successfully got geocode' + coordinates );

			// var marketsDetails = MarketQuery.fetchMarkets(coordinates);
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
				           $maxDistance: 16093
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

  createMarket: (req, res, next) => {
    // fetch the geocode first from req.body.address
    


    // create a new market
    var newMarket = Market({
      Address: req.body.address,
      GoogleLink: req.body.link,
      Products: req.body.products,
      Schedule: req.body.schedule,
      Name: req.body.name,
      geometry: {type: 'Point', coordinates: req.body.coordinates}
    });

    newMarket.save((err) => {
      if(err) {
        console.error(err);
      } else {
        console.log('added market to database!');
      }
    });
  }

};
