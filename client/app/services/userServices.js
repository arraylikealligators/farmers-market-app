angular.module('farmer.userServices', [])

.factory('Auth', function($q, $timeout, $http) {
  var user = null;

  var isAuth = function() {
    return Boolean(user);
  }

  var getUserStatus = function() {
    return user;
  }

  var login = function(credentials) {
    console.log('userServices.js: login()', credentials);
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/login',
      data: {
        email: credentials.email,
        password: credentials.password
      }
    })
    .then(function(res) {
      var success = res.data.success;

      console.log('$http.post success', success, res);
      console.log('$http.post success', res.data.success);
      user = res.data.user
      deferred.resolve(user);
    })
    .catch(err => {
      console.log(err)
      deferred.reject(err);
    });
    console.log('returning deferred promise');
    return deferred.promise;
  }

  var signup = function() {
    $http({
      method: 'POST',
      url: '/signup',
      data: {
        username: credentials.username,
        password: credentials.password
      }
    })
    .then(function(response) {
      return response.data.token;
    })
    .catch(err => console.error(err));
  }

  var signout = function() {
    $http.get('/logout')
    .then()
    .catch();
  }

  return {
    isAuth: isAuth,
    getUserStatus: getUserStatus,
    login: login,
    signup: signup,
    signout: signout,
  }
});
