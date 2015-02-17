'use strict';

describe('Prerender factory', function () {

  var sut, mockHTTP, mockQ, mockResoleve, mockWindow;

  beforeEach(function () {
    module('freelook.info');

    mockHTTP = {
      get: jasmine.createSpy().and.returnValue({
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

  beforeEach(inject(function ($window, prerender) {
    sut = prerender;
    mockWindow = $window;
  }));

  describe('calls', function () {

    it('it should resolve url for get request', function () {
      var url = 'http://xxx.com';
      var expUrl = 'http://freelookinfo.herokuapp.com/http%3A%2F%2Fxxx.com';
      sut.get(url);
      expect(mockHTTP.get).toHaveBeenCalledWith(expUrl);
    });

  });

});
