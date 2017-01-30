angular.module('farmer', ['farmer.search', 'farmer.services', 'farmer.adminServices', 'farmer.map', 'farmer.adminUpdate', 'ngMaterial', 'ngRoute', 'ngAnimate'])
.config(($routeProvider) => {
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
      controller: 'AdminLoginController'
    })
    .otherwise({
      redirectTo: '/search'
    });
})
// .run(function ($rootScope, $location, Auth) {
//   // here inside the run phase of angular, our services and controllers
//   // have just been registered and our app is ready
//   // however, we want to make sure the user is authorized
//   // we listen for when angular is trying to change routes
//   // when it does change routes, we then look for the token in localstorage
//   // and send that token to the server to see if it is a real user or hasn't expired
//   // if it's not valid, we then redirect back to signin/signup
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// });
