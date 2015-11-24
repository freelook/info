'use strict';

describe('Web google controller', function () {
  var scope, input, mockGoogle, mockYandex, rootScope, controller, _CONFIG;

  beforeEach(function () {
    module('freelook.info');

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
    return controller('search.result.web.google.ctrl', {
      $scope: scope,
      google: mockGoogle
    });
  }

  beforeEach(inject(function ($rootScope, $controller, $httpBackend, CONFIG) {

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

    $httpBackend.whenGET(/.html/).respond(200, '');
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
