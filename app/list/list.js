'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'list/list.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['commService', 'parseService', '$scope', '$sce',
  function(commService, parseService, $scope, $sce) {


}]);
