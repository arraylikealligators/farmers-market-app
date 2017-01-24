// here is the script to make the API requests to Farmer's Market API to grab all market data based on zip code
var request = require('request');
var rp = require('request-promise');
var dir = require('node-dir');
var path = require('path');
var fs = require('fs');


exports.fetchIndividualMarketData = () => {
  var marketIDs = [];
  dir.readFiles(path.join(__dirname, '/realData_allMarkets'), (err, content, next) => {
    if(err) {
      throw err;
    } else {
      var results = JSON.parse(content);
      marketIDs = getMarketIDs(results.results);
      // console.log(marketIDs);

      // var w = fs.createWriteStream(path.join(__dirname, '/realData_MarketIDs/marketIDs.js'), {'flags': 'r+'});
      // w.write(marketIDs);

      fs.writeFile(path.join(__dirname, '/realData_MarketIDs/marketIDs.js'), marketIDs, {flag: 'a'}, (err) => {
        if(err) {
          console.error(err);
        } else {
          next();
        }
      });
    }

    // next();
  }, (err, files) => {
    console.error(err);
  });
}

var getMarketIDs = (results) => {
  var iDs = results.reduce((iDs, market) => {
    iDs.push(market.id);
    return iDs;
  }, []);

  return JSON.stringify(iDs);
}

exports.fetchIndividualMarketData();
