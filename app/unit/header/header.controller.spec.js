'use strict';

describe('Header controller', function () {
  var scope;

  beforeEach(module('freelook.info'));

  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$neaw();

    $controller('HeaderCtrl', {
      $scope: scope
    });
  }));



});
