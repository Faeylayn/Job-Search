'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['jsonService', 'parseService', '$scope',
  function(jsonService, parseService, $scope) {

  // This very basically fetchs the posts.json, the parses it into the needed data in one go
  jsonService.get().then(function(json) {
    $scope.posts = parseService.parsePosts(json.data);
    $scope.posts.dailyPosts = parseService.parseObjToArray($scope.posts.dailyPost)
  })




}]);
