'use strict';

describe('Result controller', function () {
  var scope, input, mockGoogle, mockYandex, rootScope, controller;

  beforeEach(function () {

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
      yandex: mockYandex
    });
    rootScope.$apply();
  }

  beforeEach(inject(function ($rootScope, $controller) {

    $rootScope.fli = {
      route: {
        input: input,
        type: ''
      }
    };
    rootScope = $rootScope;
    scope = $rootScope.$new();
    controller = $controller;

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
