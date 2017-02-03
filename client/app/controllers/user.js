angular.module('farmer.user', ['farmer.userServices'])

.controller('UserController', function($scope, $window, $location, Auth) {
  // here is the function for admin to submit their credentials for logging into admin page
  $scope.login = () => {
    console.log('user.js userController', $scope.email, $scope.password);
    $scope.error    = false;
    $scope.disabled = true;

    Auth.login({
      email:    $scope.email,
      password: $scope.password
    })
    .then((success) => {
      // console.log('user.js Auth.login success?', success);
      // success.then((value) => {
      //   console.log('in the differed promise');
      //   console.log(typeof value, value);
      // });
      if (success) {
        console.log('user.js Auth.login successful');
        $location.path('/map');
        $scope.disabled = false;
        $scope.email = '';
        $scope.password = '';
      } else {
        // $location.path('/');
        console.log('user.js Auth.login error');
        $scope.error = true;
        $scope.errorMessage = "Invalid username or password"
        $scope.disabled = false;
        $scope.email = '';
        $scope.password = '';

      }
    })
    .catch(() => {
    });

  };
});
