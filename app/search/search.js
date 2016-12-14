'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['commService', 'parseService', '$scope', '$sce',
  function(commService, parseService, $scope, $sce) {

    var options = ['company', 'category', 'level', 'location']

    $scope.levels = ['Internship', 'Entry Level', 'Mid Level', 'Senior Level']

    //As there didn't appear to be any way to query for the allowed parameters to just set it up, we wrote it out this way so it only needed to be written out once
    $scope.categories = ['Account Management', 'Business & Strategy', 'Creative & Design',
    'Customer Service', 'Data Science', 'Editorial', 'Education', 'Engineering',
    'Finance', 'Fundraising & Development', 'Healthcare & Medicine', 'HR & Recruiting',
    'Legal', 'Marketing & PR', 'Operations', 'Project & Product Management',
    'Retail', 'Sales', 'Social Media & Community']

    //The location choices were limited to those on the dropdown on The Muse
    $scope.locations = ['New York City Metro Area', 'San Francisco Bay Area',
    'Los Angeles, CA', 'Chicago, IL', 'Flexible / Remote', 'Washington DC Metro Area',
    'Austin, TX', 'Boston Metro Area', 'Atlanta, GA', 'Seattle, WA', 'Bellevue, WA']

    $scope.options = {
      level: [],
      category: [],
      company: [],
      location: []
    };
    $scope.page = 1;

    $scope.fireSearch = function () {
      commService.get(buildApiEndpoint()).then(function(response) {
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
            base += option + "=" + encodeURIComponent(param) + "&";
          })
        }
      })
      return base + "page=" + $scope.page;
    }

    $scope.handleCheckbox = function(option, value) {
      //This toggles the checkbox and sets the value in the options array or removes it if need be
      var idx = $scope.options[option].indexOf(value);
       if (idx > -1) {
         $scope.options[option].splice(idx, 1);
       } else {
         $scope.options[option].push(value);
       }
    }

    $scope.prevPage = function() {
      // This is mostly to prevent the user from doing something odd like unhiding the button and trying to go back before page 1
      if ($scope.page > 1) {
        $scope.page -= 1;
        $scope.fireSearch();
      }
    }

    $scope.nextPage = function() {
      //It is possible if the parameters have changed that going to the next page
      //with a different search may produce strange results, and with more time
      //this could be architected to compare previous endpoints and check if they
      //have changed but that didn't seem neccessary for v1
      $scope.page += 1;
      $scope.fireSearch();
    }


}]);
