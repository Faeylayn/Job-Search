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

    var options = ['company', 'category', 'level', 'location']
    $scope.options = {};
    $scope.page = 1;

    function fireSearch() {
      commService.get(buildApiEndpoint()).then(function(response) {
        $scope.results = response.data;
      })
    }

    function buildApiEndpoint() {
      var base = 'https://api-v2.themuse.com/jobs?'
      options.forEach(function(option) {
        if ($scope.options[option] && $scope.options[option].length) {
          $scope.options[option].params.forEach(function(param) {
            base += option + "=" + param + "&";
          })
        }
      })
      return base + "page=" + $scope.page;
    }

    fireSearch()

}]);
