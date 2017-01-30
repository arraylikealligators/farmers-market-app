// here is the controller for the admin login
angular.module('farmer.login', ['farmer.adminServices'])

.controller('LoginController', function($scope, $location, Login) {
  // here is the function for admin to submit their credentials for logging into admin page
  $scope.submit = () => {
    Login.login({
      username: $scope.username,
      password: $scope.password
    })
    .then((success) => {
      $location.path('/adminUpdate');
    })
    .catch((err) => {
      console.error(err);
    })
  }
})
