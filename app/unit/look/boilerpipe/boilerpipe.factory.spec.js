'use strict';

describe('Boilerpipe', function () {

  var sut, mockApi, mockCONFIG;

  beforeEach(function () {
    module('freelook.info');
    module('fli.look');

    mockApi = {
      get: jasmine.createSpy()
    };

    module(function ($provide) {
      $provide.value('api', mockApi);
    });
  });

  beforeEach(inject(function (CONFIG, boilerpipe) {
    sut = boilerpipe;
    mockCONFIG = CONFIG;
  }));

  describe('Boilerpipe calls', function () {

    it('it should resolve url for get request', function () {
      var url = 'http://xxx.com';
      sut.get(url);
      expect(mockApi.get).toHaveBeenCalledWith(url);
    });

  });

});
