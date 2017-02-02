angular.module('farmer.accordianController', ['farmer.services'])

.controller('AccordianCtrl', function ($scope, $location, Search) {
  var accordianController = this
  var fetch = function (results) {
    $scope.results = results;
  }
  $scope.addNew = function() {
    $scope.results.push({
      market: "New One Created",
      content: "Dynamically added new one",
      isOpen: false
    });
  }
})

  // $scope.submit = () => {
  //   console.log("Submission sent!")
  //   Search.search({ address: $scope.address, radius: $scope.radius })
  //   .then((results) => {
  //     $location.path('/map');
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
  // };
  // const defaultBounds = new google.maps.LatLngBounds( new google.maps.LatLng(-33.8902, 151.1759), new google.maps.LatLng(-33.8474, 151.2631));
  // const input = document.getElementById('searchTextField');
  // const options = {
  //   bounds: defaultBounds,
  // };


