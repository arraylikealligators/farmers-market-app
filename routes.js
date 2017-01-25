var serverRoutes = require('express').Router();
var marketController = require('./marketController');



serverRoutes.route('/api/markets')
.get(/* [,some middleware] */ (req, res) => {
  // invoke marketController.getRadiusMarkets to make query to DB
  marketController.getLocationMarkets(req, res);
})





module.exports = serverRoutes;
// module.exports = function(app, express) {
//
// 	app.get('/api/getAllMarkets/', market.allMarkets);
//
// };
