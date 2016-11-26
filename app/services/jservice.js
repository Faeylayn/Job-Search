'use strict';

angular.module('myApp.commService', []).factory('commService', function($http) {
    var promise;
    var jsondata = {
        get: function() {
          // This uses a very basic promise system for flexibility to fetch and return the posts
            if ( !promise ) {
                var promise =  $http.get('https://api-v2.themuse.com/jobs?page=1').success(function(response) {
                    console.log(response);
                    return response.data;
                });
                return promise;
            }
        }
    };
    return jsondata;
});
