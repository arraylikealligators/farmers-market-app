 angular.module('farmer.adminUpdate', [])
    .controller('AdminController', function($scope, httpAdminFactory) {
      $scope.list = [];
      $scope.marketID = ''
      $scope.singleObj;
      $scope.singleObjView = false;
      $scope.alertView = false;
      $scope.successView = false;
      $scope.addView = false;
      $scope.addObject = { geometry : { type: "Point",
      coordinates: [] } };
      $scope.enterInfo = true;

      //helper function
      $scope.flipObjView = function(){
        $scope.singleObjView = !$scope.singleObjView;
      };
      //helper function 
      $scope.flipAlert = function(){
        $scope.alertView = !$scope.alertView;
      };

      $scope.flipAdd =function(){
        $scope.addView = !$scope.addView;
      };

      // $scope.flipEnterInfo = function(){
      //   $scope.enterInfo = !$scope.enterInfo;
      // }

      $scope.submitUpdate = function(){
        httpAdminFactory.update($scope.singleObj)
          .then((resp)=>{console.log(resp);
            console.log($scope.successView);
            $scope.successView= true;
            console.log($scope.successView)
          });

      };
      
      $scope.addMarket = function(){
        httpAdminFactory.addMarket($scope.addObject)
          .then((resp)=>{
            console.log("returned obj!", resp);
            $scope.successView = true;
            $scope.addView=false;
          });

      };

      $scope.deleteMarket = function(){
        console.log("inside delete market!!", $scope.singleObj)
        httpAdminFactory.deleteMarket($scope.singleObj)
          .then((resp)=>{console.log(resp);
            console.log($scope.successView);
            $scope.successView= true;
            console.log($scope.successView);
            $scope.addView = false;
          });
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
                if($scope.singleObjView===false){
                  $scope.singleObjView = true;
                }
                if($scope.successView===true){
                  $scope.successView = false;
                }
                $scope.marketID = "";
             } 
            })
            .catch(()=>{console.log("doing something");});

      }
    };
  });



