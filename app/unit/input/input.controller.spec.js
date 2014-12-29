'use strict';

describe('Input controller', function () {
  var scope, mockTimeout, controller, rootScope;

  beforeEach(function () {

    module('freelook.info');

  });

  function exequteController() {
    controller('InputCtrl', {
      $scope: scope,
      $rootScope: rootScope,
      $timeout: mockTimeout
    });
    scope.$apply();

  }

  beforeEach(inject(function ($rootScope, $controller, $timeout) {
    scope = $rootScope.$new();
    controller = $controller;
    rootScope = $rootScope;
    mockTimeout = $timeout;
  }));

  it('should define scope', function () {
    exequteController();
    expect(scope.timer).toBeNull();
  });

  it('should define default label', function () {
    exequteController();
    expect(scope.label).toBe('FREE LOOK AT INFO');
  });

  it('should stop timeout on input change', function () {
    spyOn(rootScope, '$watch');
    spyOn(mockTimeout, 'cancel');
    exequteController();
    rootScope.$watch.calls.mostRecent().args[1]('input');
    expect(mockTimeout.cancel).toHaveBeenCalled();
  });

  it('should change route and label on input change', function () {
    spyOn(rootScope, '$watch');
    rootScope.go = jasmine.createSpy();
    exequteController();
    rootScope.$watch.calls.mostRecent().args[1]('xxx');
    mockTimeout.flush();
    expect(rootScope.go).toHaveBeenCalledWith({
      input: 'xxx'
    });
    expect(scope.timer).not.toBeNull();
    expect(scope.label).toBe('FREE LOOK AT');
  });

});
