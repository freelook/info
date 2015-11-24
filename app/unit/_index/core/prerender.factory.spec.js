'use strict';

describe('Prerender factory', function () {

  var sut, mockHTTP, mockQ, mockCONFIG;

  beforeEach(function () {
    module('freelook.info');
  });

  beforeEach(inject(function ($http, $q, $httpBackend, CONFIG, prerender) {
    sut = prerender;
    mockCONFIG = CONFIG;


    mockHTTP = spyOn($http, 'get').and.returnValue({
      success: jasmine.createSpy().and.returnValue({
        error: jasmine.createSpy()
      })
    });

    mockQ = spyOn($q, 'defer').and.returnValue({
      resolve: jasmine.createSpy(),
      reject: jasmine.createSpy(),
      promise: jasmine.createSpy()
    });

    $httpBackend.whenGET(/.html/).respond(200, '');

  }));

  describe('calls', function () {

    it('it should resolve url for get request', function () {
      var url = 'http://xxx.com';
      var expUrl = mockCONFIG.PRERENDER.URL + 'http%3A%2F%2Fxxx.com';
      sut.get(url);
      expect(mockHTTP).toHaveBeenCalledWith(expUrl);
    });

  });

});
