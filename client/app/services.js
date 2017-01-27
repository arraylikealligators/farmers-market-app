angular.module('farmer.services', [])

.factory('Search', function ($http) {

  const searchResults = [];

  const search = (params) => {
    return $http({
      method: 'GET',
      url: '/api/search',
      data: {
        address: params.address
      }
    })
    .then(function (response) {
      searchResults = response.data;
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
