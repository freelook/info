'use strict';

beforeEach(function () {
  module('freelook.info');
  module(function ($provide) {
    $provide.value('CacheFactory', jasmine.createSpy());
  });

  angular.module('freelook.info')
    .run(function ($httpBackend) {
      $httpBackend.whenGET(/.*/).respond(200, '');
      $httpBackend.whenJSONP(/.*/).respond(200, '');
    });
});
