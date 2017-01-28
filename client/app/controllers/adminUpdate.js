 angular.module('farmer.adminUpdate', [])
    .controller('AdminController', function($scope, httpAdminFactory) {
      $scope.list = [];
      $scope.marketID = ''
      $scope.singleObj;
      $scope.singleObjView = false;
      $scope.alertView = false;
      $scope.flipObjView = function(){
        $scope.singleObjView = !$scope.singleObjView;
      };

      $scope.flipAlert = function(){
        $scope.alertView = !$scope.alertView;
      };
     
      $scope.retrieveMarket = function(){

        if($scope.marketID){
          console.log('marketId in scope: ', $scope.marketID);
          httpAdminFactory.getOne($scope.marketID)
            .then((obj)=> { 
              console.log("first log", obj)
              $scope.singleObj= obj; 
              if($scope.singleObj === undefined){
                $scope.flipAlert();
              }else{
                $scope.flipObjView();
                $scope.marketID = "";
              }
            })
            .then(()=>{console.log("doing something");});

      }
    };
  });



