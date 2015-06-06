'use strict';

describe('Lucky controller', function () {
  var scope, mockGoogle, rootScope, controller, _CONFIG;

  beforeEach(function () {
    module('freelook.info');
    module('fli.search');

    mockGoogle = {
      random: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      })
    };

  });

  function exequteController() {
    return controller('search.lucky.ctrl', {
      google: mockGoogle,
      $scope: scope
    });
  }

  beforeEach(inject(function ($rootScope, $controller, CONFIG) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    controller = $controller;
    _CONFIG = CONFIG;
  }));

  it('should call google service for random world', function () {
    var vm = exequteController();
    expect(vm.lucky).toBe('freelook');
    expect(mockGoogle.random).toHaveBeenCalled();
  });

});
