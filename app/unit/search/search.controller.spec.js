'use strict';

describe('Search controller', function () {
  var scope, mockRouteParams, input, mockGoogle, rootScope, controller;

  beforeEach(function () {

    module('freelook.info');

    input = 'xxx';

    mockRouteParams = {
      input: input,
      from: 'google'
    };

    mockGoogle = {
      search: jasmine.createSpy()
    };

  });

  function exequteController() {
    controller('SearchCtrl', {
      $scope: scope,
      $rootScope: rootScope,
      $routeParams: mockRouteParams,
      Google: mockGoogle
    });
    rootScope.$apply();
  }

  beforeEach(inject(function ($rootScope, $controller) {

    $rootScope.fli = {};
    rootScope = $rootScope;
    scope = $rootScope.$new();
    controller = $controller;

  }));

  it('should define root route and search', function () {
    exequteController();
    expect(rootScope.fli.route).toBe(mockRouteParams);
    //expect(scope.search).toBeDefined();
  });

  xit('should call google service if route defined', function () {
    exequteController();
    expect(mockGoogle.search).toHaveBeenCalledWith(input, jasmine.any(Function));
  });

  xit('should set search on scope if call for search success', function () {
    var expectedResponse = {data: 'data'};
    exequteController();
    mockGoogle.search.calls.mostRecent().args[1](expectedResponse);
    expect(scope.search).toBe(expectedResponse);
  });

  xit('should not call google service if route not defined', function () {
    mockRouteParams = {};
    exequteController();
    expect(mockGoogle.search).not.toHaveBeenCalled();
  });

});
