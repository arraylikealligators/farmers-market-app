var mongoose = require('mongoose');
var zip = require('../server/model/zipModel');
var market = require('../server/model/farmModel');


var dbRefresh = function () {
  zip.find((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(results)
  })
}

module.exports = dbRefresh;