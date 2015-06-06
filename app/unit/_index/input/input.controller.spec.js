'use strict';

describe('Input controller', function () {
  var scope, defpleceholder, controller, rootScope;


  beforeEach(function () {

    module('freelook.info');

  });

  function exequteController(input) {
    scope.fli = {route: {input: input}};
    controller('input.ctrl', {
      $scope: scope
    });
    scope.$apply();
  }

  beforeEach(inject(function ($rootScope, $controller, DEFAULT_PLACEHOLDER) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    controller = $controller;
    defpleceholder = DEFAULT_PLACEHOLDER;

    rootScope.fli = {
      route: {
        input: ''
      }
    };

  }));


  it('should define default label', function () {
    exequteController('');
    expect(scope.placeholder).toBe(defpleceholder);
  });

  it('should change route on input change', function () {
    exequteController('xxx');
    scope.fli.route.input = 'xxx';
    rootScope.go = jasmine.createSpy();
    scope.find();
    expect(rootScope.go).toHaveBeenCalledWith('search?input=xxx');
  });

  it('should clear input', function () {
    exequteController('xxx');
    scope.clear();
    expect(rootScope.fli.route.input).toBe('');
  });

});
