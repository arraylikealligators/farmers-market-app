var serverRoutes = require('express').Router();
var marketController = require('../controllers/marketController');
var util = require('../util/util_functions');
var bcrypt = require('bcrypt-nodejs');

// this single, one-time admin setup should only be invoked once. As long as the database has 1 instance of the admin, this route should never ever be visited a second time.
serverRoutes.route('/setup')
.get((req, res) => {

})

serverRoutes.route('/api/search')
.get(/* [,some middleware] */ (req, res) => {
  // invoke marketController.getRadiusMarkets to make query to DB
  marketController.getLocationMarkets(req, res);
});

serverRotes.route('api/login')
.get(util.checkAdmin, (req, res) => {
  
})

serverRoutes.route('/api/create')
.post(/* [,some middleware] */ (req, res) => {
  // invoke marketController.createMarket to add a new market to DB
  marketController.createMarket(req, res);
});

serverRoutes.route('/api/getOne')
.post((req,res) => {

  marketController.fetchOne(req, res)

})


module.exports = serverRoutes;
