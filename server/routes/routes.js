var serverRoutes = require('express').Router();
var marketController = require('../controllers/marketController');



serverRoutes.route('/api/search')
.get(/* [,some middleware] */ (req, res) => {
  // invoke marketController.getRadiusMarkets to make query to DB
  marketController.getLocationMarkets(req, res);
});

		



module.exports = serverRoutes;
// module.exports = function(app, express) {
//
// 	app.get('/api/getAllMarkets/', market.allMarkets);
//
// };
