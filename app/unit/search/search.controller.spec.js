'use strict';

describe('Search controller', function () {
  var mockRouteParams, input, rootScope, controller;

  beforeEach(function () {

    module('freelook.info');

    input = 'xxx';

    mockRouteParams = {
      input: input
    };


  });

  function exequteController() {
    controller('search.ctrl', {
      $rootScope: rootScope,
      $routeParams: mockRouteParams
    });
    rootScope.$apply();
  }

  beforeEach(inject(function ($rootScope, $controller) {

    $rootScope.fli = {};
    rootScope = $rootScope;
    controller = $controller;

  }));

  it('should define root route and search', function () {
    exequteController();
    expect(rootScope.fli.route).toBe(mockRouteParams);
  });

});
