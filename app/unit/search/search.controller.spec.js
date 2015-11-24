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
  }

  beforeEach(inject(function ($rootScope, $controller, $httpBackend) {

    $rootScope.fli = {};
    rootScope = $rootScope;
    controller = $controller;

    $httpBackend.whenGET(/.html/).respond(200, '');

  }));

  it('should define root route and search', function () {
    exequteController();
    expect(rootScope.fli.route).toBeDefined();
  });

});
