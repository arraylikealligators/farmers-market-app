var market = require('./marketController.js')

module.exports = function(app, express) {


	app.get('/api/getAllMarkets/', market.allMarkets);
	app.post('/api/postMarket/', market.postMarket);

};