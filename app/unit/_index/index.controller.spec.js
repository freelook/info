'use strict';

describe('Index controller', function () {
  var rootScope, mockIo;

  beforeEach(function () {
    module('freelook.info');

    mockIo = {
      on: jasmine.createSpy()
    };

  });

  beforeEach(inject(function ($rootScope, $controller) {

    rootScope = $rootScope;

    $controller('index.ctrl', {
      $rootScope: rootScope
    });

  }));

  it('should define fli', function () {
    expect(rootScope.fli).toBeDefined();
  });

});

