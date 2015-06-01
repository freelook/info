'use strict';

describe('Result controller', function () {
  var scope, input, mockGoogle, mockYandex, rootScope, controller, _CONFIG;

  beforeEach(function () {
    module('freelook.info');
    module('fli.search');

    input = 'xxx';

    mockGoogle = {
      search: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy().and.returnValue({
          error: jasmine.createSpy()
        })
      }),
      autocomplete: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      }),
      random: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      })
    };

    mockYandex = {
      search: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      })
    };

  });

  function exequteController() {
    controller('search.result.ctrl', {
      $scope: scope,
      google: mockGoogle,
      yandex: mockYandex,
      CONFIG: _CONFIG
    });
    rootScope.$apply();
  }

  beforeEach(inject(function ($rootScope, $controller, CONFIG) {

    $rootScope.fli = {
      route: {
        input: input,
        type: ''
      }
    };
    rootScope = $rootScope;
    scope = $rootScope.$new();
    controller = $controller;
    _CONFIG = CONFIG;
  }));

  it('should call google service if route defined', function () {
    exequteController();
    expect(mockGoogle.search).toHaveBeenCalledWith(input, '');
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

});
