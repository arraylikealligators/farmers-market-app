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

// { marketdetails: 
//    { Address: 'St. James Church, 391 Delaware Ave,, Albany, New York',
//      GoogleLink: 'http://maps.google.com/?q=40.5767%2C%20-73.9839%20(%22Delaware+Area+Neighborhood+Farmers+Market%22)',
//      Products: '',
//      Schedule: '',
//      Lat: '40.5767',
//      Long: '-73.9839',
//      Name: 'Delaware Area Neighborhood Farmers Market' } }