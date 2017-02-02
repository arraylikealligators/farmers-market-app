var marketController = require('../controllers/marketController');
var adminController = require('../controllers/adminController');

var twilio = require('../controllers/twilioController');
var util = require('../util/util_functions');
var bcrypt = require('bcrypt-nodejs');


module.exports = function(app, passport) {
  // this single, one-time admin setup should only be invoked once. As long as the database has 1 instance of the admin, this route should never ever be visited a second time.
  app.get('/setup', (req, res) => {
    adminController.setup(req, res);
  });

  app.get('/api/search', /* [,some middleware] */ (req, res) => {
    // invoke marketController.getRadiusMarkets to make query to DB
    marketController.getLocationMarkets(req, res);
  });

  app.post('/api/login', (req, res) => {
    adminController.login(req, res);
  });

  app.post('/api/create', /* [,some middleware] */ (req, res) => {
    // invoke marketController.createMarket to add a new market to DB
    marketController.createMarket(req, res);
  });

  app.post('/api/getOne', (req,res) => {
    marketController.fetchOne(req, res);
  });

  app.put('/api/update', (req,res)=>{
    marketController.updateOne(req, res);
  });

  app.put('/api/delete', (req,res)=>{
    // console.log("in serverRoutes at delete");
    console.log(req.body, "obj in routes");
    marketController.delete(req,res);
  });

  app.put('/api/add', (req,res)=>{
    marketController.addMarket(req,res);
  });


  /************************************
  * new routes for passport and auth *
  ************************************/
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/search',
    failureRedirect: '/signup',
    failureFlash: true,
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/search',
    failureRedirect: '/signup',
    failureFlash: true,
  }));

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

<<<<<<< HEAD
  app.post('/message', (req, res) => {
    var phone = req.body.phoneNum;
    var content = req.body.message;
    twilio.sendMessage(phone, content);
    res.status(200).send();
  })

=======
}

// auth middleware for protected routes
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
>>>>>>> minor code cleanup
}



// module.exports = serverRoutes; // relic from pre-refactor
