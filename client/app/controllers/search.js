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

  const defaultBounds = new google.maps.LatLngBounds( new google.maps.LatLng(-33.8902, 151.1759), new google.maps.LatLng(-33.8474, 151.2631));

  const input = document.getElementById('searchTextField');

  const options = {
    bounds: defaultBounds,
    types: ['geocode']
  };

  $scope.autocomplete = new google.maps.places.Autocomplete(input, options);

  $scope.redirectToLogin = () => {
    $location.path('/adminLogin');
  }

});
