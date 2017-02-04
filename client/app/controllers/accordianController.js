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

    $scope.comment = ''
    $scope.author = 'Peter'

    $scope.submitComment = function (id) {
      const newComment = {
        id,
        author: $scope.author,
        comment: $scope.comment
      }
      Search.sendNewComment(newComment)
        .then(data => {
          console.log('line 32:  ', data);
        })
        .catch(err => console.error(err))
    }
  })
