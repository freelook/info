'use strict';

describe('Look content controller', function () {
  var scope, mockRootScope, mockRouteParams;


  beforeEach(function () {
    module('freelook.info');
    mockRouteParams = {};
  });

  beforeEach(inject(function ($rootScope, $routeParams, $controller) {

    scope = $rootScope.$new();
    mockRootScope = $rootScope;
    mockRootScope.fli = {
      route: ''
    };

    $controller('look.content.ctrl', {
      $rootScope: mockRootScope,
      $routeParams: mockRouteParams,
      $scope: scope
    });

  }));

  it('should define route', function () {
    expect(mockRootScope.fli.route).toBeDefined();
  });

});
