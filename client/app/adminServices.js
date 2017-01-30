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
.factory('Login', function($http) {
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
      return response.token;
    });
  }
})
