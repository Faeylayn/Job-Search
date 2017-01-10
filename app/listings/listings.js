'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'listings/listings.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['commService', 'parseService', '$scope', '$sce', '$route',
  function(commService, parseService, $scope, $sce, $route) {

    commService.get('http://localhost:5000/listings').then(function(data) {
      $scope.listings = data.data.listings;
    })

    $scope.addListing = function() {
      var payload = {
        ListingName: $scope.ListingName,
        ListingCompany: $scope.ListingCompany,
        Link: $scope.Link,
        ResultPage: $scope.ResultPage,
      }
      commService.post('http://localhost:5000/listings', payload).then(function() {
        $route.reload();
      })
    }

}]);
