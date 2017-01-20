// here is the script to make the API requests to Farmer's Market API to grab all market data based on zip code
var request = require('request');
var rp = require('request-promise');
var dir = require('node-dir');
var path = require('path');
var fs = require('fs');


exports.fetchIndividualMarketData = function() {
  dir.readFiles(path.join(__dirname, '/realData'), function(err, content, next) {
    if(err) throw err;

    console.log(content);
    next();
  })
}

exports.fetchIndividualMarketData();
