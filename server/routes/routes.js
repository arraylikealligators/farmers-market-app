var serverRoutes = require('express').Router();
var marketController = require('../controllers/marketController');



serverRoutes.route('/api/search')
.get(/* [,some middleware] */ (req, res) => {
  // invoke marketController.getRadiusMarkets to make query to DB
  marketController.getLocationMarkets(req, res);
});

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
