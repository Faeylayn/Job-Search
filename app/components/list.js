'use strict';

angular.module('myApp.resultList', [])

.directive('resultList', function() {
  return {
    restrict: 'E',
    scope: {
      results: '=results',
    },
    templateUrl: 'components/list.html'
  };
});
