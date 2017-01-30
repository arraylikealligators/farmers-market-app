angular.module('farmer.adminServices', [])

.factory('httpAdminFactory', function ($http) {


    var getOne = function(marketId){
      console.log("retrieving an object http request ");
        return $http({
        method: 'POST',
        url: '/api/getOne',
        data: { marketId : marketId}
      })
        .catch(()=>{console.log("not working");})
    };

    var update = function(updatedObj){
      console.log("updating an object http request")
      return $http({
        method: 'PUT',
        url: '/api/update',
        data: { updatedObj : updatedObj }
      });

    };

    var deleteMarket = function(market){
      console.log("in service factory ", market)
      return $http({
        method: 'PUT',
        url: '/api/delete',
        data: { market: market}
      });
    };

    var addMarket = function(market){
      console.log("in service factory adding");
      console.log("new market:", market);
      return $http({
        method: 'PUT',
        url: '/api/add',
        data: { market: market}
      });
    }

    return {
      getOne : getOne,
      update: update,
      deleteMarket: deleteMarket,
      addMarket: addMarket
    };


});
