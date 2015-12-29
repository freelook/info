'use strict';

describe('Input controller', function () {
  var scope, defpleceholder, mockLocale, mockNav, controller, mockUrl;


  beforeEach(function () {

    module('fli.uix');

    mockUrl = {
      href: jasmine.createSpy()
    };

    mockLocale = {
      getCode: jasmine.createSpy()
    };

    mockNav = {
      goHome: jasmine.createSpy()
    }

  });

  function exequteController(input) {
    scope.fli = {route: {input: input}};
    return controller('input.ctrl', {
      $scope: scope,
      url: mockUrl,
      locale: mockLocale,
      nav: mockNav
    });
  }

  beforeEach(inject(function ($rootScope, $controller, PLACEHOLDER) {
    scope = $rootScope.$new();
    controller = $controller;
    defpleceholder = PLACEHOLDER;
    scope.go = jasmine.createSpy();
    scope.fli = {
      route: {
        input: ''
      }
    };
  }));

  it('should define default label', function () {
    var ctrl = exequteController('');
    expect(ctrl.placeholder).toBe(defpleceholder);
  });

  it('should change route on input change', function () {
    var ctrl = exequteController('xxx');
    scope.fli.route.input = 'xxx';
    mockUrl.href.and.returnValue('?input=xxx');
    ctrl.find();
    expect(scope.go).toHaveBeenCalledWith('?input=xxx');
  });

  it('should clear input', function () {
    var ctrl = exequteController('xxx');
    ctrl.clear();
    expect(scope.fli.route.input).toBeNull();
  });

});
