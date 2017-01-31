angular.module('farmer', ['xeditable','farmer.search', 'farmer.services', 'farmer.adminServices', 'farmer.map', 'farmer.login', 'farmer.adminUpdate', 'ngMaterial', 'ngRoute', 'ngAnimate'])
.config(($routeProvider, $httpProvider) => {
  $routeProvider
    .when('/search', {
      templateUrl: 'app/views/search.html',
      controller: 'SearchController'
    })
    .when('/map', {
      templateUrl: 'app/views/map.html',
      controller: 'MapController'
    })
    .when('/adminUpdate', {
      templateUrl: 'app/views/adminSubmit.html',
      controller: 'AdminController'
    })
    .when('/adminLogin', {
      templateUrl: 'app/views/adminLogin.html',
      controller: 'LoginController',
      authenticate: true
    })
    .otherwise({
      redirectTo: '/search'
    });

    // an $httpProvider interceptor is added to all request calls so that all outgoing $http requests have the token attached
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function($window) {
  var attach = {
    request: function(object) {
      var jwt = $window.localStorage.getItem('token');
      if(jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function($rootScope, $location, Auth) {
  // listen for when user wants to make a route change
  // make sure to send the token to the server with the route change request
  // redirect to admin login for the route(s) that require an 'authenticate'
  $rootScope.$on('$routeChangeStart', function(evt, next, current) {
    if(next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/adminLogin');
    }
  });
});
