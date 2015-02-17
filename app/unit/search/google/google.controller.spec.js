'use strict';

describe('Google controller', function () {
  var scope, input, mockGoogle, rootScope, controller;

  beforeEach(function () {

    module('fli.search');

    input = 'xxx';

    mockGoogle = {
      search: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      }),
      autocomplete: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      })
    };

  });

  function exequteController() {
    controller('GoogleCtrl', {
      $scope: scope,
      $rootScope: rootScope,
      Google: mockGoogle
    });
    rootScope.$apply();
  }

  beforeEach(inject(function ($rootScope, $controller) {

    $rootScope.fli = {
      route: {
        input: input
      }
    };
    rootScope = $rootScope;
    scope = $rootScope.$new();
    controller = $controller;

  }));

  it('should call google service if route defined', function () {
    exequteController();
    expect(mockGoogle.search).toHaveBeenCalledWith(input);
  });

  it('should set search on scope if call for search success', function () {
    var expectedResponse = {data: 'data'};
    exequteController();
    mockGoogle.search(input).success.calls.mostRecent().args[0](expectedResponse);
    expect(scope.search).toBe(expectedResponse);
  });

  it('should not call google service if route not defined', function () {
    rootScope.fli.route.input = '';
    exequteController();
    expect(mockGoogle.search).not.toHaveBeenCalled();
  });

  it('should no call google autocomplete service', function () {
    rootScope.fli.route.input = '';
    exequteController();
    expect(mockGoogle.autocomplete).not.toHaveBeenCalled();
  });
  it('should call google autocomplete service with input', function () {
    rootScope.fli.route.input = 'xxx';
    exequteController();
    expect(mockGoogle.autocomplete).toHaveBeenCalledWith('xxx');
  });


  it('should set suggested on scope if call for autocomplete success', function () {
    var expectedArr = ['x', 'xx'],
      expectedResponse = [[], expectedArr];

    exequteController();
    mockGoogle.autocomplete(input).success.calls.mostRecent().args[0](expectedResponse);
    expect(scope.suggested).toBe(expectedArr);
  });

});
