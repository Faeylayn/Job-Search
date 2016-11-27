'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['commService', 'parseService', '$scope', '$sce',
  function(commService, parseService, $scope, $sce) {

    var options = ['company', 'category', 'level', 'location']

    $scope.categories = ['Account Management', 'Business & Strategy', 'Creative & Design',
    'Customer Service', 'Data Science', 'Editorial', 'Education', 'Engineering',
    'Finance', 'Fundraising & Development', 'Healthcare & Medicine', 'HR & Recruiting',
    'Legal', 'Marketing & PR', 'Operations', 'Project & Product Management',
    'Retail', 'Sales', 'Social Media & Community']


    $scope.options = {
      level: [],
      category: [],
      company: [],
      location: []
    };
    $scope.page = 1;

    $scope.fireSearch = function () {
      console.log(buildApiEndpoint());
      commService.get(buildApiEndpoint()).then(function(response) {
        console.log(response);
        $scope.results = response.data.results;
        $scope.results.forEach(function(result) {
          result.trustedResult = $sce.trustAsHtml(result.contents)
        })
      })
    }

    function buildApiEndpoint() {
      var base = 'https://api-v2.themuse.com/jobs?'
      options.forEach(function(option) {
        if ($scope.options[option] && $scope.options[option].length) {
          $scope.options[option].forEach(function(param) {
            // if (param.indexOf('&') > -1) {
            //   param.splice(param.indexOf('&'))
            // }
            base += option + "=" + encodeURIComponent(param) + "&";
          })
        }
      })
      return base + "page=" + $scope.page;
    }

    $scope.handleCheckbox = function(option, value) {
      console.log(option, value);
      console.log($scope.options[option]);
      var idx = $scope.options[option].indexOf(value);
       if (idx > -1) {
         $scope.options[option].splice(idx, 1);
       } else {
         $scope.options[option].push(value);
       }
      console.log($scope.options);
    }

    // fireSearch()

}]);
