'use strict';

describe('Index controller', function () {
  var mockRoute, rootScope, mockIo;

  beforeEach(function () {
    module('freelook.info');

    mockRoute = {
      updateParams: jasmine.createSpy()
    };

    mockIo = {
      on: jasmine.createSpy()
    };

  });

  beforeEach(inject(function ($rootScope, $controller) {

    rootScope = $rootScope;

    $controller('index.ctrl', {
      $rootScope: rootScope,
      $route: mockRoute
    });
    rootScope.$apply();
  }));

  it('should define fli', function () {
    expect(rootScope.fli).toBeDefined();
  });

  it('should update route params', function () {
    var expectParams = {input: 'xxx'};
    rootScope.go(expectParams);
    expect(mockRoute.updateParams).toHaveBeenCalledWith(expectParams);
  });

});

