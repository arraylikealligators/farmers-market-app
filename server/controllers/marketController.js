var Market = require('../model/farmModel.js');
var Q = require('q');
var rp = require('request-promise');
var MarketQuery = require('../methods/marketMethods');

var getAllFarms = Q.nbind(Market.find, Market);

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
		var address = replaceSpaceInAddress('1216 Broadway New York, NY'); //req.body
		// var address =
		rp.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`
		).then((data) => {
			var coordinates = JSON.parse(data).results[0].geometry.location;
			// console.log('successfully got geocode', lat);

      

			var marketsDetails = MarketQuery.fetchMarkets(coordinates);
      res.send(marketsDetails);
		}).catch((err) => {
			console.error('Failed', err);
		});
		// some function to get a list of farms that match the DB query


		// send the query result to front-end as res.json()
	}
};
