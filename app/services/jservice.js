'use strict';

angular.module('myApp.jsonService', []).factory('jsonService', function($http) {
    var promise;
    var jsondata = {
        get: function() {
          //This uses a very basic promise system for flexibility to fetch and return the posts
            if ( !promise ) {
                var promise =  $http.get('./posts.json').success(function(response) {
                    return response.data;
                });
                return promise;
            }
        }
    };
    return jsondata;
});
