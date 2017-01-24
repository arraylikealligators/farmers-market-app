// here is script to parse NYC Market IDs into usuable array of strings and the subsequent request to USDA Farmer's Market API to fetch individual market data
var request = require('request');
var asynchronous = require('async');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');


exports.fetchMarketID = () => {
  fs.readFile(path.join(__dirname, './realData_MarketIDs/marketIDs.json'), (err, data) => {
    if(err) {
      console.error(err);
    } else {
      var replacement = /(\]\[)/g;
      var ids = (data.toString('utf8').replace(replacement, ','));
      var uniqueIDs = _.uniq(JSON.parse(ids));
      
      // remove the 'error' string that somehow got in there.... Very barbaric method, but must be done
      uniqueIDs.splice(108, 1);

      asynchronous.eachSeries(uniqueIDs, fetchIndividualMarketData, (err) => {
        if(err) {
          console.error(err);
        }
      });
    }
  })
}

var fetchIndividualMarketData = (ids, cb) => {
  request(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${ids}`, (err, res, content) => {
    if(err) {
      console.error(err);
    } else {
      fs.writeFile(path.join(__dirname, '/realData_MarketsData/individualMarketData.json'), `${content},`, {flag: 'a'}, (err) => {
        if(err) {
          console.error(err);
        } else {
          cb();
        }
      })
    }
  })
}

exports.fetchMarketID();
