var Market = require('./farmModel.js');
var Q = require('q');
var rp = require('request-promise');
// import {GOOGLE_API_KEY} from './API_KEYS.js';
var GOOGLE_API_KEY = require('./API_KEYS');

var getAllFarms = Q.nbind(Market.find, Market);

var replaceSpaceInAddress = (address) => {
  return address.split(' ').join('+');
}

module.exports = {

	allMarkets: function(req,res,next){
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
		var address = replaceSpaceInAddress(req.body);
		rp.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`
		).then((data) => {
			
			console.log('successfully got geocode', data);
		}).catch((err) => {
			console.error('Failed', err);
		});
		// some function to get a list of farms that match the DB query



		// convert the `req.url` and `req.body` (which will be the radius with the address as center) into a longitutude/latitude
		// send the query result to front-end as res.json()
	}
};
