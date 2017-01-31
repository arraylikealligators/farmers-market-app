angular.module('farmer.search', ['farmer.services'])

.controller('SearchController', function ($scope, $location, Search) {
  // Scope variable to store user address input
  $scope.address = '';
  // Scope variable to store search radius input (default 2 miles)
  $scope.radius = 2;
  // Scope variable to submit address string querry to server and then redirect to the results page on success
  $scope.submit = () => {
    console.log("Submission sent!")
    Search.search({ address: $scope.address, radius: $scope.radius })
    .then((results) => {
      $location.path('/map');
    })
    .catch(function (error) {
      console.error(error);
    });
  };
  // Sets geographic bounds for autocomplete address lookup
  const defaultBounds = new google.maps.LatLngBounds( new google.maps.LatLng(-33.8902, 151.1759), new google.maps.LatLng(-33.8474, 151.2631));
  // Finds element on page to associate autocomplete input funcationlity with
  const input = document.getElementById('searchTextField');
  // Autocomplete configuration options - see maps API docs for more info
  const options = {
    bounds: defaultBounds,
  };
  // Creates new autocomplete input object
  $scope.autocomplete = new google.maps.places.Autocomplete(input, options);
  // Redirects user to admin login page
  $scope.redirectToLogin = () => {
    $location.path('/adminLogin');
  }

});
