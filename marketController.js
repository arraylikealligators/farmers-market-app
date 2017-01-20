var mongoose = require('mongoose');
var Market = require('./farmModel.js');
var Q = require('q');
mongoose.connect('mongodb://<fazzar>:<fazzar>@ds117869.mlab.com:17869/fazzar');


var getAllFarms = Q.nbind(Market.find, Market);

module.exports{

	allMarkets: function(req,res,next){
		getAllFarms({})
		  .then(function(farms){
		  	res.json(farms)
		  })
		  .fail(function(error){
		  	next(error);
		  });
	}
}