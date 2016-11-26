'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['commService', 'parseService', '$scope',
  function(commService, parseService, $scope) {
    commService.get('https://api-v2.themuse.com/jobs?page=1');


}]);
