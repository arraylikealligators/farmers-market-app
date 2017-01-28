var mongoose = require('mongoose');
var Market = require('../model/farmModel.js');
var Q = require('q');

var queryMarkets = Q.nbind(Market.find, Market);

module.exports = {
  fetchMarkets: (coordinates) => {
    var marketsDetails; // Rishi, how do you want the marketDetails??
    queryMarkets(coordinates)
    .then((markets) => {
      marketsDetails = markets;
      console.log('successful query to mongoDB for markets', marketsDetails);
    })
    .catch((err) => {
      console.error(err);
    });

    return marketsDetails;
  }
}
