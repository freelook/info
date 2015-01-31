'use strict';

describe('Input controller', function () {
  var scope, defLabel, splitLabel, controller;


  beforeEach(function () {

    module('fli.search');

  });

  function exequteController(input) {
    scope.fli = {route:{input: input}};
    controller('InputCtrl', {
      $scope: scope
    });
    scope.$apply();
  }

  beforeEach(inject(function ($rootScope, $controller, DEFAULT_LABEL, SPLIT_LABEL) {
    scope = $rootScope.$new();
    controller = $controller;
    defLabel = DEFAULT_LABEL;
    splitLabel = SPLIT_LABEL;
  }));


  it('should define default label', function () {
    exequteController('');
    expect(scope.label).toBe(defLabel);
  });

  it('should change route on input change', function () {
    exequteController('xxx');
    scope.go = jasmine.createSpy();
    scope.search();
    expect(scope.go).toHaveBeenCalledWith({
      input: 'xxx'
    });
  });

  it('should change label on input change', function () {
    exequteController('xxx');
    scope.setLabel();
    expect(scope.label).toBe(splitLabel);
  });

});
