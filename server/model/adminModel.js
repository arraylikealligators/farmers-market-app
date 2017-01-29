// here is the mongoDB model for admin(s) so that they can login and make changes to the DB
var mongoose = require('mongoose');

var admin = new mongoose.Schema({
  name: String,
  password: {
    type: String,
    required: true
  },
  salt: String,
  admin: Boolean
});

module.exports = mongoose.model('admin', admin);
