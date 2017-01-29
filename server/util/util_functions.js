// here are the utility functions used throughout the app

var isLoggedIn = (req) => {
  return req.session ? !!req.session.user : false;
}
module.exports = {

  replaceSpaceInAddress: (address) => {
    return address.split(' ').join('+');
  },

  convertMilesToKm: (miles) => {
    return miles * 1609.34;
  },

  checkAdmin: (req, res, next) => {
    var usn = req.body.username;
    var pw = req.body.password;

    if(!isLoggedIn(req)) {
      res.redirect('/login')
    }
  }
}
