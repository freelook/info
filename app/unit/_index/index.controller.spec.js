'use strict';

describe('Index controller', function () {
  var mockRoute, rootScope;

  beforeEach(function () {
    module('freelook.info');

    mockRoute = {
      updateParams: jasmine.createSpy()
    };

  });

  beforeEach(inject(function ($rootScope, $controller) {

    rootScope = $rootScope;

    $controller('IndexCtrl', {
      $rootScope: rootScope,
      $route: mockRoute
    });
    rootScope.$apply();
  }));

  it('should define route', function () {
    expect(rootScope.route).toBeDefined();
  });

  it('should update route params', function () {
    var expectParams = {input: 'xxx'};
    rootScope.go(expectParams);
    expect(mockRoute.updateParams).toHaveBeenCalledWith(expectParams);
  });

});

