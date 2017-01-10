'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'listings/listings.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['commService', 'parseService', '$scope', '$sce',
  function(commService, parseService, $scope, $sce) {

    commService.get('http://localhost:5000/listings').then(function(data) {
      console.log(data);
      $scope.listings = data.data.listings;
    })

}]);