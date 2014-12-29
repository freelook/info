'use strict';

describe('Yandex controller', function () {
  var scope, input, mockYandex, rootScope, controller, mockSce, expectedUrl;

  beforeEach(function () {

    module('fli.search');

    input = 'xxx';
    expectedUrl = 'http://yandex.com';

    mockYandex = {
      search: jasmine.createSpy().and.returnValue({
        then: jasmine.createSpy()
      })
    };

    mockSce = {
      trustAsResourceUrl: jasmine.createSpy().and.returnValue(expectedUrl)
    };

  });

  function exequteController() {
    controller('YandexCtrl', {
      $scope: scope,
      $rootScope: rootScope,
      $sce: mockSce,
      Yandex: mockYandex
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

  it('should call yandex service if route defined', function () {
    exequteController();
    expect(mockYandex.search).toHaveBeenCalledWith(input);
  });

  it('should set search url on scope if call success', function () {
    exequteController();
    mockYandex.search(input).then.calls.mostRecent().args[0](expectedUrl);
    expect(mockSce.trustAsResourceUrl).toHaveBeenCalledWith(expectedUrl);
    expect(scope.searchUrl).toBe(expectedUrl);
  });

  it('should not call yandex service if route not defined', function () {
    rootScope.fli.route.input = '';
    exequteController();
    expect(mockYandex.search).not.toHaveBeenCalled();
  });

});
