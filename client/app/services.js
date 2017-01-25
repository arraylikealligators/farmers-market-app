angular.module('farmer.services', [])

.factory('Search', ($http) => {
  
  var search = (params) => {
    return $http({
      method: 'GET',
      url: '/api/search'
      data: {
        address: params.address
      }
    })
    .then(function (response) {
      return response.data;
    })
  };






  return {
    search: search
  }
})
