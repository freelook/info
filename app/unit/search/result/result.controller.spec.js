'use strict';

describe('Result controller', function () {
  var scope, rootScope, controller, _CONFIG, mockFaceBook;

  beforeEach(function () {
    module('freelook.info');

    mockFaceBook = {
      share: jasmine.createSpy()
    };

  });

  function exequteController() {
    return controller('search.result.ctrl', {
      $scope: scope,
      CONFIG: _CONFIG,
      facebook: mockFaceBook
    });
    rootScope.$apply();
  }

  beforeEach(inject(function ($rootScope, $controller, $httpBackend, CONFIG) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    controller = $controller;
    _CONFIG = CONFIG;

    $httpBackend.whenGET(/.html/).respond(200, '');
  }));

  it('should share link with facebook', function () {
    var vm = exequteController();
    expect(vm.share).toBeDefined();
  });

});
