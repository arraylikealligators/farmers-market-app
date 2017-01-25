var Market = require('./farmModel.js');
var Q = require('q');


var getAllFarms = Q.nbind(Market.find, Market);
var createMarket = Q.nbind(Market.create, Market);

module.exports = {

	allMarkets: function(req,res,next){
		getAllFarms({})
		  .then(function(farms){
		  	res.json(farms);
		  })
		  .fail(function(error){
		  	next(error);
		  });
	},

	postMarket: function(req, res){
	
		var newMarket;
		if(req.body.marketdetails){
			newMarket = {
				Address: req.body.marketdetails.Address,
				GoogleLink: req.body.marketdetails.GoogleLink,
				Products: req.body.marketdetails.Products,
				Schedule: req.body.marketdetails.Schedule,
				Lat: req.body.marketdetails.Lat,
				Long: req.body.marketdetails.Long,
				Name: req.body.marketdetails.Name
			};
			 createMarket(newMarket);
	
			 res.send("created");
		} else{ res.send("bad request!"); }
		
		}
};