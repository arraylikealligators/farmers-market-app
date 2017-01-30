// here is the controller (server-side) for the login. A query for the admin will be made and the result of that query will generate a jwt
var Admin = require('../model/adminModel');
var Q = require('q');
var jwt = require('jwt-simple');
var util = require('../util/util_functions');

var findAdmin = Q.nbind(Admin.find, Admin);
var addAdmin = Q.nbind(Admin.create, Admin);

module.exports = {
  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    // console.log('login, looking at username', req.body);

    findAdmin({username: username})
    .then(function(user) {
      if(!user) {
        next(new Error('admin does not exist'));
      } else {
        return user[0].comparePassword(password)
        .then(function(valid) {
          if(valid) {
            var token = jwt.encode(user, 'aFarmerSecret');
            res.json({token: token});
          } else {
            return next(new Error('password invalid'));
          }
        });
      }
    })
    .fail(function(err) {
      next(err);
    });
  },

  setup: function(req, res, next) {
    // this is a 1-time-use function that will add the admin credentials to the DB
    var username = 'farmer';
    var password = 'farmer';

    addAdmin({username: username, password: password})
    .then(function(success) {
      res.sendStatus(201);
    })
    .catch(function(err) {
      res.sendStatus(400);
    });
  }
};
