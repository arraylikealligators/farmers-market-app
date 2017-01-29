angular.module('farmer.adminServices', [])

.factory('httpAdminFactory', function ($http) {


    var getOne = function(marketId){
      console.log("in http request fact")
        return $http({
        method: 'POST',
        url: '/api/getOne',
        data: { marketId : marketId}
      // })
      // .then(function(singleObj){
      //   console.log(singleObj)
      //   return singleObj;
      // }

      })
        .catch(()=>{console.log("not working")})
    };

    return {
      getOne : getOne
    };


});
