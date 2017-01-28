angular.module('farmer.map', ['farmer.services'])

.controller('MapController', function ($scope, $location, Search, SampleData, GoogleMaps) {

// Functionality for search bar on the results page

  $scope.address = ''; // Scope variable to store user address input
  $scope.radius = 10; // Scope variable to store search radius input


  $scope.submit = () => { // Sends search request to server
    console.log("Submission sent!")
    Search.search({ address: $scope.address, radius: $scope.radius})
    .then((results) => {
      $scope.results = results;

      GoogleMaps.Marker.deleteAll($scope.markers);

      for(let i = 0; i < $scope.results.length; i++) {
        GoogleMaps.Marker.create($scope.map, $scope.markers, $scope.results[i]);
      }

    })
    .catch(function (error) {
      console.error(error);
    });
  };


// Functionality for search results

  const sampleData = SampleData.data;

  let storedResults = Search.retrieveResults(); // Pulls any stored results in Search factory

  console.log(storedResults);

  // Stores markets that return from the search requests on search.html or map.html pages
  $scope.results = storedResults.length !== 0 ? storedResults : sampleData;


// Functionality for Google Map

  // Contains the configuration options used for creating a Google Map on page
  const mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(40.7058253, -74.1180872), // Filled in with coordinates for the center of NYC
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    streetViewControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    }
  };

  // Stores an infoWindow object that pops up when the user clicks on a marker
  let infoWindow = new google.maps.InfoWindow();

  // Creates and stores a new Google Maps object on page
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Stores all the farmer marker's markers created based on search results
  $scope.markers = [];

  // $scope.openInfoWindow = (e, selectedMarker) => {
  //   e.preventDefault();
  //   google.maps.event.trigger(selectedMarker, 'click');
  // };

  for(let i = 0; i < $scope.results.length; i++) {
    GoogleMaps.Marker.create($scope.map, $scope.markers, $scope.results[i]);
  }









  // var infoWindow = new google.maps.InfoWindow();

    // var createMarker = function (info){
    //
    //     var marker = new google.maps.Marker({
    //         map: $scope.map,
    //         position: new google.maps.LatLng(info.lat, info.long),
    //         title: info.city
    //     });
    //     marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
    //
    //     google.maps.event.addListener(marker, 'click', function(){
    //         infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
    //         infoWindow.open($scope.map, marker);
    //     });
    //
    //     $scope.markers.push(marker);
    //
    // }
    //
    // for (i = 0; i < cities.length; i++){
    //     createMarker(cities[i]);
    // }

    // $scope.openInfoWindow = function(e, selectedMarker){
    //     e.preventDefault();
    //     google.maps.event.trigger(selectedMarker, 'click');
    // }

});
