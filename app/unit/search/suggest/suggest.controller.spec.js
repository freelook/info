'use strict';

describe('Suggest controller', function () {
  var scope, input, mockGoogle, rootScope, controller;

  beforeEach(function () {

    module('fli.search');

    input = 'xxx';

    mockGoogle = {
      autocomplete: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      }),
      trends: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      })
    };

  });

  function exequteController() {
    controller('search.suggest.ctrl', {
      $scope: scope,
      google: mockGoogle
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

  it('should call google trends if autocomplete has no items', function () {
    var expectedArr = [],
      expectedResponse = [[], expectedArr];
    exequteController();
    mockGoogle.autocomplete(input).success.calls.mostRecent().args[0](expectedResponse);
    expect(mockGoogle.trends).toHaveBeenCalled();
  });

});
