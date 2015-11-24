'use strict';

describe('Look controller', function () {
  var scope, mockRootScope, mockRouteParams;


  beforeEach(function () {
    module('freelook.info');
    mockRouteParams = {};
  });

  beforeEach(inject(function ($rootScope, $routeParams, $httpBackend, $controller) {

    scope = $rootScope.$new();
    mockRootScope = $rootScope;
    mockRootScope.fli = {
      route: ''
    };

    $controller('look.ctrl', {
      $rootScope: mockRootScope,
      $routeParams: mockRouteParams,
      $scope: scope
    });

    $httpBackend.whenGET(/.html/).respond(200, '');

  }));

  it('should define route', function () {
    expect(mockRootScope.fli.route).toBeDefined();
  });

});
