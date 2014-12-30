'use strict';

describe('Yandex controller', function () {
  var scope, input, mockYandex, rootScope, controller, expectedResponse;

  beforeEach(function () {

    module('fli.search');

    input = 'xxx';
    expectedResponse = [{
      title: 'xxx'
    }];

    mockYandex = {
      search: jasmine.createSpy().and.returnValue({
        then: jasmine.createSpy()
      })
    };

  });

  function exequteController() {
    controller('YandexCtrl', {
      $scope: scope,
      $rootScope: rootScope,
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
    mockYandex.search(input).then.calls.mostRecent().args[0](expectedResponse);
    expect(scope.search).toBe(expectedResponse);
  });

  it('should not call yandex service if route not defined', function () {
    rootScope.fli.route.input = '';
    exequteController();
    expect(mockYandex.search).not.toHaveBeenCalled();
  });

});
