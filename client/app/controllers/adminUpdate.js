 angular.module('farmer.adminUpdate', [])
    .controller('AdminController', function($scope, httpAdminFactory) {
      $scope.list = [];
      $scope.marketID = ''
      $scope.singleObj;
      // $scope.dummyTest = function() {
      //   if ($scope.marketID) {
      //     $scope.list.push($scope.marketID);
      //     $scope.marketID = "";
      //   }
      // };
      $scope.retrieveMarket = function(){

        if($scope.marketID){
          console.log($scope.marketID);
          httpAdminFactory.getOne($scope.marketID)
            .then((obj)=> {$scope.singleObj= obj})
          console.log($scope.singleObj);
        }
      };

    });
