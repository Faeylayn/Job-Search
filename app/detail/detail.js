'use strict';

angular.module('myApp.detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/detail', {
    templateUrl: 'detail/detail.html',
    controller: 'DetailCtrl'
  });
}])

.controller('DetailCtrl', ['commService', '$scope', '$sce', '$location',
  function(commService, $scope, $sce, $location) {


      commService.get('http://localhost:5000/').then(function(response) {
        console.log(response);
        $scope.result = response.data;
          $scope.result.trustedResult = $sce.trustAsHtml($scope.result.ResultPage)
        })



}]);
