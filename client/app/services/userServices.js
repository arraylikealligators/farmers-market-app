angular.module('farmer.userServices', [])

.factory('Auth', function('$q', '$timeout', '$http') {
  var user = null;

  var isLoggedIn = function() {
    if (user)
  }

  var getUserStatus = function() {
    return user;
  }

  var login = function(credentials) {
    var deferred = $q.defer();

    $http({
      method: 'POST',
      url: '/login',
      data: {
        username: credentials.username,
        password: credentials.password
      }
    })
    .then(function(res) {
      console.log(res);
      user = true;
      deferred.resolve();
    })
    .catch();
  }

  var isAuth = function() {
    return !!$window.localStorage.getItem('token');
  }

  var signout = function() {
    $window.localStorage.removeItem('token');
    $location.path('/search');
  }

  return {
    isAuth: isAuth,
    getUserStatus: getUserStatus,
    login: login,
    signout: signout,
    signup: signup
  }
});
