// here is the controller (server-side) for the login. A query for the user will be made and the result of that query will generate a jwt
var User = require('../model/userModel');
var Q = require('q');
var jwt = require('jwt-simple');
var util = require('../util/util_functions');

var findUser = Q.nbind(User.find, User);
var addUser = Q.nbind(User.create, User);

module.exports = {
  signup: (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username})
    .then(user => {
      if (!user) {

      }
    });

  },

  // login: function(req, res, next) {
  //   var username = req.body.username;
  //   var password = req.body.password;
  //   // console.log('login, looking at username', req.body);
  //
  //   findUser({username: username})
  //   .then(function(user) {
  //     if(!user) {
  //       next(new Error('user does not exist'));
  //     } else {
  //       return user[0].comparePassword(password)
  //       .then(function(vser({username: username, password: password})
  //   .then(function(success) {
  //     res.sendStatus(201);
  //   })
  //   .catch(function(err) {
  //     res.sendStatus(400);
  //   });
  // }
};
