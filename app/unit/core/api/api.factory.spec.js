'use strict';

describe('API', function () {

  var sut, mockHTTP, mockCONFIG;

  beforeEach(function () {
    module('freelook.info');
  });

  beforeEach(inject(function (CONFIG, api, $http) {
    sut = api;
    mockCONFIG = CONFIG;
    mockHTTP = spyOn($http, 'get').and.callThrough();
  }));

  describe('API calls', function () {

    it('it should resolve url for get request', function () {
      var url = 'http://xxx.com';
      var expUrl = mockCONFIG.API.URL + 'proxy/http://xxx.com';
      sut.get(url);
      expect(mockHTTP).toHaveBeenCalledWith(expUrl);
    });

  });

});
