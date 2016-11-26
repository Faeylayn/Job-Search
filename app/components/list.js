'use strict';

angular.module('myApp.postList', [])

.directive('postList', function() {
  return {
    restrict: 'E',
    scope: {
      posts: '=posts',
      postDisplay: '=display',
      displayCondition: '=displayCondition'
    },
    templateUrl: 'components/list.html'
  };
});
