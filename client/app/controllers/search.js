angular.module('farmer.search', ['farmer.services'])

.controller('SearchController', function ($scope, $location, Search) {
  // Scope variable to store user address input
  $scope.address = '';
  // Scope variable to store search radius input (default 10 miles)
  $scope.radius = 5;

  $scope.submit = () => {
    console.log("Submission sent!")
    Search.search({ address: $scope.address, radius: $scope.radius })
    .then((results) => {
      // $scope.results = results;
      $location.path('/map');
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  $scope.redirectToLogin = () => {
    $location.path('/adminLogin');
  }

});
