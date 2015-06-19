'use strict';

describe('Web all controller', function () {
  var scope, input, mockGoogle, mockYandex, rootScope, controller, _CONFIG;

  beforeEach(function () {
    module('freelook.info');
    module('fli.search');

    input = 'xxx';

    mockGoogle = {
      web: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy().and.returnValue({
          error: jasmine.createSpy()
        })
      })
    };

    mockYandex = {
      search: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      })
    };

  });

  function exequteController() {
    return controller('search.result.web.all.ctrl', {
      $scope: scope,
      google: mockGoogle,
      yandex: mockYandex,
      CONFIG: _CONFIG
    });
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
    expect(mockGoogle.web).toHaveBeenCalledWith(input);
  });

  it('should set search on scope if call for search success', function () {
    var expectedResponse = {data: 'data'};
    var vm = exequteController();
    mockGoogle.web(input).success.calls.mostRecent().args[0](expectedResponse);
    expect(vm.search).toBe(expectedResponse);
  });

  it('should not call google service if route not defined', function () {
    rootScope.fli.route.input = '';
    exequteController();
    expect(mockGoogle.web).not.toHaveBeenCalled();
  });

});
