'use strict';

describe('Input controller', function () {
  var scope, defpleceholder, controller, mockUrl;


  beforeEach(function () {

    module('freelook.info');

    mockUrl = {
      href: jasmine.createSpy()
    }

  });

  function exequteController(input) {
    scope.fli = {route: {input: input}};
    return controller('input.ctrl', {
      $scope: scope,
      url: mockUrl
    });
  }

  beforeEach(inject(function ($rootScope, $controller, PLACEHOLDER) {
    scope = $rootScope.$new();
    controller = $controller;
    defpleceholder = PLACEHOLDER;

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
    scope.go = jasmine.createSpy();
    mockUrl.href.and.returnValue('search?input=xxx');
    ctrl.find();
    expect(scope.go).toHaveBeenCalledWith('search?input=xxx');
  });

  it('should clear input', function () {
    var ctrl = exequteController('xxx'), event = {stopPropagation: jasmine.createSpy()};
    ctrl.clear(event);
    expect(scope.fli.route.input).toBe('');
    expect(event.stopPropagation).toHaveBeenCalled();
  });

});
