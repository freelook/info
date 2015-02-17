'use strict';

describe('API', function () {

  var sut, mockHTTP, mockQ, mockResoleve, mockWindow;

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

  beforeEach(inject(function ($window, api) {
    sut = api;
    mockWindow = $window;
  }));

  describe('API calls', function () {

    it('it should resolve url for get request', function () {
      var url = 'http://xxx.com';
      var expUrl = 'http://freelook.herokuapp.com/get?url=http%3A%2F%2Fxxx.com&callback=JSON_CALLBACK';
      sut.get(url);
      expect(mockHTTP.jsonp).toHaveBeenCalledWith(expUrl);
    });

  });

});
