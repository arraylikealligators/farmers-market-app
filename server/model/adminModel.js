// here is the mongoDB model for admin(s) so that they can login and make changes to the DB
var mongoose = require('mongoose');
var Q = require('q');
var bcrypt = require('bcrypt-nodejs');
const SALT = 5;

var adminSchema = new mongoose.Schema({
  name: String,
  password: {
    type: String,
    required: true
  },
  salt: String,
  admin: Boolean
});

// the comparePassword will live as a method inside the admin model
adminSchema.methods.comparePassword = function(adminInputPassword) {
  var savedPassword = this.password;

  return Q.promise(function(resolve, reject) {
    bcrypt.compare(adminInputPassword, savedPassword, function(err, isMatch) {
      if(err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

// set up a listener to salt the password right before it gets saved into the DB
adminSchema.pre('save', function(next) {
  var admin = this;

  if(!user.isModified('password')) {
    return next();
  }

  // generate salt
  bcrypt.genSalt(SALT, function(err, salt) {
    if(err) {
      return next(err);
    }

    // hash password with salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) {
        return next(err);
      }

      // update the user password with the newly generated hash
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});


module.exports = mongoose.model('admin', adminSchema);
