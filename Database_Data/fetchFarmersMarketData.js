// here is the script to make the API requests to Farmer's Market API to grab all market data based on zip code
var request = require('request');
var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');
// var zipCodesNYC = require('./zipCodesNYC');

exports.fetchAllData = function (zipCode) {
  // iterate through all zip codes and save response to a unique JSON file
  // request(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zipCode}`, function(error, res, body) {
  //   if(!error) {
  //     console.error(error);
  //   }
  // }).pipe((data) => {
  //   console.log(data)
  // });
  var dataArray = [];
  request.get(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zipCode}`, (eerror, res, body) => {
    JSON.parse(body).results.forEach((market) => {
      var ids = market.id
      request.get(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${ids}`, (eerror, res, marketBody) => {
        var Name = market.marketname.split('').slice(5).join("");
        marketBody = JSON.parse(marketBody)
        var Address = marketBody['marketdetails']['Address'];
        var GoogleLink = marketBody['marketdetails']['GoogleLink'];
        var string = marketBody['marketdetails']['GoogleLink'];
        var start = string.indexOf("=");
        var end = string.indexOf("(");
        var coordString = string.slice(start + 1, end);
        var scissorIndex = coordString.indexOf("-");
        var latitudeWithPercentages = coordString.slice(0, scissorIndex);
        var longitudeWithPercentages = coordString.slice(scissorIndex);
        var percentLatIndex = latitudeWithPercentages.indexOf("%");
        var percentLongIndex = longitudeWithPercentages.indexOf("%");
        var longitude = Number(longitudeWithPercentages.slice(0, percentLongIndex));
        var latitude = Number(latitudeWithPercentages.slice(0, percentLatIndex));
        var Schedule = marketBody['marketdetails']['Schedule'].replace(/\<br\>/g," ");
        dataArray.push({Name, Address, GoogleLink, Schedule, geometry: { type: "Point" , coordinates: [ longitude, latitude ] } })
      })
    })
  })

}

// var fs = require('fs');
//
// exports.fetchAllData = (zipCodes) => {
//   // iterate through all zip codes and save response to a unique JSON file
//   zipCodes.forEach((zipCode) => {
//     request(`http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${zipCode}`, (error, res, body) => {
//       if(!error) {
//         console.error(error);
//       }
//     }).pipe(fs.createWriteStream(`realData/${zipCode}_Data.json`));
//   })
// }

exports.fetchAllData;