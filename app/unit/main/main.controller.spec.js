'use strict';

describe('Main controller', function () {
  var scope;

  beforeEach(module('freelook.info'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$new();

    $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should define scope', function () {
    expect(scope.isDefined).toBeTruthy();
  });

});
