'use strict';

angular.module('myApp.commService', []).factory('commService', function($http) {
    var promise;
    var jsondata = {
        get: function(endpoint) {
          // This uses a very basic promise system for flexibility to fetch and return from an api
            if ( !promise ) {
                var promise =  $http.get(endpoint).success(function(response) {
                    return response.data;
                });
                return promise;
            }
        }
    };
    return jsondata;
});
