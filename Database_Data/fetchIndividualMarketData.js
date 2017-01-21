// here is the script to make the API requests to Farmer's Market API to grab all market data based on zip code
var request = require('request');
var rp = require('request-promise');
var dir = require('node-dir');
var path = require('path');
var fs = require('fs');


exports.fetchIndividualMarketData = () => {
  var marketIDs = [];
  dir.readFiles(path.join(__dirname, '/realData'), (err, content, next) => {
    if(err) {
      throw err;
    } else {
      console.log(marketIDs.slice(-1));
      var results = JSON.parse(content);
      marketID = getMarketID(results.results);
      marketIDs = marketIDs.concat(marketID);
    }

    next();
  }, (err, files) => {
    
  });
}

var getMarketID = (results) => {
  return results.reduce((iDs, market) => {
    iDs.push(market.id);
    return iDs;
  }, []);
}

exports.fetchIndividualMarketData();
