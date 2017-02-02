// here is the mongoDB model for user(s) so that they can login and make changes to the DB
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const SALT = 5;

var userSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  // facebook: {},
  // google: {},
});

// the comparePassword will live as a method inside the user model
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
