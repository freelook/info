'use strict';

describe('API', function () {

  var sut, mockHTTP, mockQ, mockResoleve, mockCONFIG;

  beforeEach(function () {
    module('freelook.info');

    mockHTTP = {
      jsonp: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy().and.returnValue({
          error: jasmine.createSpy()
        })
      })
    };

    mockResoleve = jasmine.createSpy();

    mockQ = {
      defer: jasmine.createSpy().and.returnValue({
        resolve: mockResoleve,
        reject: jasmine.createSpy(),
        promise: jasmine.createSpy()
      })
    };

    module(function ($provide) {
      $provide.value('$http', mockHTTP);
      $provide.value('$q', mockQ);
    });
  });

  beforeEach(inject(function (CONFIG, api) {
    sut = api;
    mockCONFIG= CONFIG;
  }));

  describe('API calls', function () {

    it('it should resolve url for get request', function () {
      var url = 'http://xxx.com';
      var expUrl = mockCONFIG.API.URL + 'get?url=http%3A%2F%2Fxxx.com&callback=JSON_CALLBACK';
      sut.get(url);
      expect(mockHTTP.jsonp).toHaveBeenCalledWith(expUrl);
    });

  });

});
