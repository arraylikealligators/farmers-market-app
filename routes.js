var serverRoutes = require('express').Router();
var marketController = require('./marketController.js');


serverRoutes.route('/api/markets/:address')
.get((req, res) => {
	// convert the `req.url` and `req.body` (which will be the radius with the address as center) into a longitutude/latitude
	// invoke marketController.getRadiusMarkets to make query to DB
	// send the query result to front-end as res.json()
})

















module.exports = serverRoutes;
// module.exports = function(app, express) {
//
// 	app.get('/api/getAllMarkets/', market.allMarkets);
//
// };
