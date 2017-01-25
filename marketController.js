var Market = require('./farmModel.js');
var Q = require('q');


var getAllFarms = Q.nbind(Market.find, Market);

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

	getRadiusMarkets: (req, res, next) => {
		// some function to get a list of farms that match the DB query
	}
};
