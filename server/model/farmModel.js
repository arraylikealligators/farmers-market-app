var mongoose = require('mongoose');

//time should maybe stored as seconds 
var marketSchema = new mongoose.Schema({
	Address: String,
	GoogleLink: String,
	Products: String,
	Schedule: String,
	Lat: Number,
	Long: Number,
	Name: String	

}); 

module.exports = mongoose.model('Market', marketSchema);