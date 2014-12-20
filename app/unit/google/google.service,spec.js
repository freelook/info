'use strict';

describe('Google service', function () {

  var sut, mockHTTP;

  beforeEach(function () {
    module('freelook.info');

    mockHTTP = {
      jsonp: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      })
    };

    module(function ($provide) {
      $provide.value('$http', mockHTTP);
    });
  });

  beforeEach(inject(function (Google) {
    sut = Google;
  }));

  describe('HTTP calls', function () {

    it('it should call http for search', function () {
      var q = 'xxx';
      var expectedRequest = 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&q=' + q + '&callback=JSON_CALLBACK';
      sut.search(q, function() {});
      expect(mockHTTP.jsonp).toHaveBeenCalledWith(expectedRequest);
    });

    it('it should not call http for search if no request text', function () {
      var q = '';
      sut.search(q, function() {});
      expect(mockHTTP.jsonp).not.toHaveBeenCalled();
    });

    it('it should not call http for search if no callback', function () {
      var q = 'xxx';
      sut.search(q);
      expect(mockHTTP.jsonp).not.toHaveBeenCalled();
    });

    it('it should call callback if request success', function () {
      var q = 'xxx';
      var mockCallback = jasmine.createSpy();
      var expectedResponse = {data: 'data'};
      sut.search(q, mockCallback);
      mockHTTP.jsonp().success.calls.mostRecent().args[0](expectedResponse);
      expect(mockCallback).toHaveBeenCalledWith(expectedResponse);
    });

  });

});
