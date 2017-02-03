angular.module('farmer.accordianController', ['farmer.services'])

  .controller('AccordianCtrl', function ($scope, $location, $mdDialog, Search) {
    var accordianController = this

    $scope.selectedMarketIndex = undefined;

    $scope.selectMarketIndex = function (index) {
      if ($scope.selectedMarketIndex !== index) {
        $scope.selectedMarketIndex = index;
      } else {
        $scope.selectedMarketIndex = undefined;
      }
    };

    var fetch = function (results) {
      $scope.results = results;
    }
    
    $scope.addNew = function () {
      $scope.results.push({
        market: "New One Created",
        content: "Dynamically added new one",
        isOpen: false
      });

    }
  })
