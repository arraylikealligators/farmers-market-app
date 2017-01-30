angular.module('farmer.adminServices', [])

.factory('httpAdminFactory', function ($http) {


  var getOne = function(marketId){
    console.log("in http request fact")
      return $http({
      method: 'POST',
      url: '/api/getOne',
      data: { marketId : marketId}
    // })
    // .then(function(singleObj){
    //   console.log(singleObj)
    //   return singleObj;
    // }

    });
  };

  return {
    getOne : getOne
  };
})
.factory('Auth', function($http, $window, $location) {
  var login = function(credentials) {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: {
        username: credentials.username,
        password: credentials.password
      }
    })
    .then(function(response) {
      console.log('adminServices>Login Factory>response', response);
      return response.data.token;
    });
  }

  var isAuth = function() {
    return !!$window.localStorage.getItem('token');
  }

  var signout = function() {
    $window.localStorage.removeItem('token');
    $location.path('/search');
  }

  return {
    login: login,
    isAuth: isAuth,
    signout: signout
  }
})
