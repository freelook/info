'use strict';

describe('Header controller', function () {
  var scope;

  beforeEach(module('freelook.info'));

  beforeEach(inject(function ($rootScope, $controller, $httpBackend) {

    scope = $rootScope.$neaw();

    $controller('header.ctrl', {
      $scope: scope
    });

    $httpBackend.whenGET(/.html/).respond(200, '');

  }));



});
