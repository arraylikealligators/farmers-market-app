angular.module('farmer.services', [])

.factory('Search', function ($http) {

  const searchResults = [];

  const search = (params) => {
    $http({
      method: 'GET',
      url: '/api/search',
      params: {
        address: params.address,
        radius: params.radius
      }
    })
    .then(function (response) {
      console.log('response data', response);
      // searchResults = response.data;

      return response.data;
    })
  };

  const retrieveResults = () => {
    return searchResults;
  }


  return {
    search: search,
    retrieveResults: retrieveResults
  }
})

.factory('Add', function($http) {
  const add = (market) => {
    $http({
      method: 'POST',
      url: '/api/add',
      data: {
        marketData: market
      }
    })
    .then(function() {
      console.log('successful post to server');
    })
    .catch(function(err) {
      console.error(err);
    });
  }
})

.factory('SampleData', function () {

  const sampleData = [{
    "marketdetails":{
      "Address": "St. James Church, 391 Delaware Ave,, Albany, New York",
      "GoogleLink":"http://maps.google.com/?q=40.5767%2C%20-73.9839%20(%22Delaware+Area+Neighborhood+Farmers+Market%22)",
      "Products":"",
      "Schedule":"",
      "Lat":40.5767,
      "Long":-73.9839,
      "Name":"Delaware Area Neighborhood Farmers Market"
    }
  },
  {
    "marketdetails":{
    "Address":"WEST 16 STREET SURF AVE, BROOKLYN, New York, 11224",
    "GoogleLink":"http://maps.google.com/?q=40.581106%2C%20-73.983650%20(%22Coney+Island+Farmers+Market%22)",
    "Products":"Cut flowers; Eggs; Fresh fruit and vegetables; Fresh and/or dried herbs; Honey; Maple syrup and/or maple products; Plants in containers",
    "Schedule":"06/15/2014 to 10/26/2014 Sun: 8:00 AM-3:30 PM",
    "Lat":40.581106,
    "Long":-73.98365,
    "Name":"Coney Island Farmers Market"
    }
  },
  {
    "marketdetails":{
      "Address":"18th Ave between 81st & 82nd Streets, Brooklyn, New York, 11214",
      "GoogleLink":"http://maps.google.com/?q=40.6155350%2C%20-74.0109559%20(%22Bensonhurst%22)",
      "Products":"Baked goods; Fresh fruit and vegetables; Honey",
      "Schedule":"07/07/2013 to 11/23/2013 Sun: 9:00 AM-4:00 PM",
      "Lat":40.615535,
      "Long":-74.0109559,
      "Name":"Bensonhurst"
    }
  }];

  return {
    data: sampleData
  }
})

.factory('GoogleMaps', function() {

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
  //






  return {

  }


})
