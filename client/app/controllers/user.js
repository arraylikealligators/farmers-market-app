angular.module('farmer.user', ['farmer.userServices'])

.controller('UserController', function($scope, $window, $location, Auth) {
  // here is the function for admin to submit their credentials for logging into admin page
  $scope.submit = () => {
    Auth.login({
      username: $scope.username,
      password: $scope.password
    })
    .then((token) => {
      // save the token that the server sends back in localStorage
      $window.localStorage.setItem('token', token);
      $location.path('/adminUpdate');
    })
    .catch((err) => {
      console.error(err);
    });
  };
});
