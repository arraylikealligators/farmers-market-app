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
              console.log("http request returned an obj");
              if(obj.data === "not found"){
                console.log("farm not found!")
                $scope.alertView = true;
              }else{
                $scope.alertView = false;
                $scope.singleObj= obj; 
                $scope.flipObjView();
                $scope.marketID = "";
             } 
            })
            .catch(()=>{console.log("doing something");});

      }
    };
  });



