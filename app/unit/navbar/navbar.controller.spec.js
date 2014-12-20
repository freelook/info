'use strict';

describe('Navbar controller', function () {
  var scope;

  beforeEach(module('freelook.info'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$neaw();

    $controller('NavbarCtrl', {
      $scope: scope
    });
  }));



});
