angular.module('farmer.search', ['farmer.services'])

.controller('SearchController', function ($scope, $location, Search) {
  // Scope variable to store user address input
  $scope.address = '';

  $scope.submit = () => {
    console.log("Submission sent!")
    Search.search({ address: $scope.address})
    .then((results) => {
      $scope.results = results;
      $location.path('/map');
    })
    .catch(function (error) {
      console.error(error);
    });
  };

});
