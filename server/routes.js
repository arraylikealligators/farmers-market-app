var market = require('./marketController.js')

module.exports = function(app, express) {

	app.get('/', function(req,res){ console.log(req.cookies); res.send("yo"); console.log(req.cookies); console.log(req.session); console.log("beneath cookies and sessions")});
	app.get('/api/getAllMarkets/', market.allMarkets);

};