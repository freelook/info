'use strict';

describe('Lucky controller', function () {
  var $q, vm, scope, mockLucky, rootScope, controller, _CONFIG;

  beforeEach(function () {
    module('freelook.info');

    beforeEach(inject(function ($rootScope, $controller, _$q_, CONFIG) {
      rootScope = $rootScope;
      $q = _$q_;
      scope = $rootScope.$new();
      scope.go = jasmine.createSpy();
      controller = $controller;
      _CONFIG = CONFIG;
    }));

    mockLucky = {
      get: jasmine.createSpy().and.returnValue($q.when({href: 'href'}))
    };

  });

  function exequteController() {
    vm = controller('search.lucky.ctrl', {
      lucky: mockLucky,
      $scope: scope
    });
  }

  it('should call google service for random world', function () {
    exequteController();
    vm.go();
    expect(mockLucky.get).toHaveBeenCalled();
  });

});
