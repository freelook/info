'use strict';

describe('API', function () {

  var sut, mockHTTP, mockCONFIG;

  beforeEach(function () {
    module('freelook.info');

    mockHTTP = {
      get: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy().and.returnValue({
          error: jasmine.createSpy()
        })
      })
    };

    module(function ($provide) {
      $provide.value('$http', mockHTTP);
    });
  });

  beforeEach(inject(function (CONFIG, api) {
    sut = api;
    mockCONFIG = CONFIG;
  }));

  describe('API calls', function () {

    it('it should resolve url for get request', function () {
      var url = 'http://xxx.com';
      var expUrl = mockCONFIG.API.URL + 'proxy?url=http://xxx.com';
      sut.get(url);
      expect(mockHTTP.get).toHaveBeenCalledWith(expUrl);
    });

  });

});
