'use strict';

describe('Footer controller', function () {
  var scope, vm;

  beforeEach(module('freelook.info'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$new();

    vm = $controller('footer.ctrl', {
      $scope: scope
    });

  }));

  it('should has about', function () {
    expect(vm.about).toBeDefined();
  });

  it('should has feedback', function () {
    expect(vm.feedback).toBeDefined();
  });

});
