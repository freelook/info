'use strict';

describe('Main controllers', function () {
  var scope;

  beforeEach(module('freelook.info'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$new();

    $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should define scope', function () {
    spyOn(scope, 'test').and.returnValues(1);
    expect(scope).toBeDefined();
    expect(scope.test()).toBe(1);
  });

});
