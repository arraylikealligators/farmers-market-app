angular.module('farmer.map', ['farmer.services'])

.controller('MapController', function ($scope, $location, Search) {
  // Scope variable to store user address input
  $scope.address = '';

  $scope.results = Search.retrieveResults();

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

/*
{
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
}
*/
