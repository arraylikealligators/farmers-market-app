var mongoose = require('mongoose');

//time should maybe stored as seconds 
var marketSchema = new mongoose.Schema({
	lat: Number,
	long: Number,
	address: { type: String},
	startMonth: { type: Date },
	monday: {
		startTime: Number,
		endTime: Number
	},
	tuesday: {
		startTime: Number,
		endTime: Number
	},
	wednesday: {
		startTime: Number,
		endTime: Number
	},
	thursday: {
		startTime: Number,
		endTime: Number
	},
	friday: {
		startTime: Number,
		endTime: Number
	},
	saturday: {
		startTime: Number,
		endTime: Number
	},
	sunday: {
		startTime: Number,
		endTime: Number
	},
	products: {
		bread: String,
		poultry: String,
		meat: String,
		bakedgoods: String,
		eggs: String,
		fruitAndVeggies: String,
		herbs: String,
		honey: String,
	}

}); 

module.exports = mongoose.model('Market', marketSchema);