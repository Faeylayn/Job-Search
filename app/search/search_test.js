'use strict';

describe('myApp.search module', function() {

  beforeEach(module('myApp.search'));
  beforeEach(module('myApp.commService'));
  beforeEach(module('myApp.parseService'));

  describe('search controller', function(){

    it('should ....', inject(function($controller, $rootScope) {
      //spec body
      var searchCtrl = $controller('SearchCtrl', {'$scope': $rootScope.$new()});
      expect(searchCtrl).toBeDefined();
    }));

  });
});
