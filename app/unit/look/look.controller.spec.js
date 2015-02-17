'use strict';

describe('Look controller', function () {
  var scope, mockRootScope, mockRouteParams;


  beforeEach(function () {
    module('freelook.info');

    mockRouteParams = {
      type: 'full'
    };

  });

  beforeEach(inject(function ($rootScope, $routeParams, $controller) {

    scope = $rootScope.$new();
    mockRootScope = $rootScope;
    mockRootScope.fli = {
      route: ''
    };

    $controller('LookCtrl', {
      $rootScope: mockRootScope,
      $routeParams: mockRouteParams
    });

  }));

  it('should define route', function () {
    expect(mockRootScope.fli.route).toBe(mockRouteParams);
  });

});
