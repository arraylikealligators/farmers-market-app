// here is the script to make the API requests to Farmer's Market API to grab all market data based on zip code
var request = require('request');
var zipCodesNYC = require('./zipCodesNYC');
var fs = require('fs');
// console.log(zipCodesNYC);

exports.fetchAllData = function(zipCodes) {
  // iterate through all zip codes and save response to a unique JSON file
  zipCodes.forEach(function(zipCode) {
    request(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zipCode}`, function(error, res, body) {
      if(!error) {
        console.error(error);
      }
    }).pipe(fs.createWriteStream(`realData/${zipCode}_Data.json`));
  })
}

// exports.fetchAllData(zipCodesNYC.zipCodesNYC);
