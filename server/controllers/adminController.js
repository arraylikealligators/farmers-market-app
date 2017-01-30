// here is the controller (server-side) for the login. A query for the admin will be made and the result of that query will generate a jwt
var User = require('../model/adminModel');
var Q = require('q');
var jwt = require('jwt-simple');
var util = require('../util/util_functions');

var findAdmin = Q.nbind(User.findOne, User);

module.exports = {
  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    findAdmin({username: username})
    .then(function(user) {
      if(!user) {
        next(new Error('admin does not exist'));
      } else {
        return user.comparePassword(password);
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
  }
};
