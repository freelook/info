'use strict';


describe('Google', function () {

  var sut, mockHTTP, mockToast;

  beforeEach(function () {
    module('fli.search');

    mockHTTP = {
      jsonp: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy().and.returnValue({
          error: jasmine.createSpy()
        }),
        error: jasmine.createSpy()
      })
    };

    mockToast = {
      show: jasmine.createSpy()
    };

    module(function ($provide) {
      $provide.value('$http', mockHTTP);
      $provide.value('toast', mockToast);
    });
  });

  beforeEach(inject(function (google) {
    sut = google;
  }));

  describe('HTTP calls', function () {

    it('it should call http for search', function () {
      var q = 'xxx';
      var expectedRequest = 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&q=' + q + '&num=12&callback=JSON_CALLBACK';
      sut.search(q);
      expect(mockHTTP.jsonp).toHaveBeenCalledWith(expectedRequest);
    });

    it('it should not call http for search if no request text', function () {
      var q = '';
      sut.search(q);
      expect(mockHTTP.jsonp).not.toHaveBeenCalled();
    });

    it('it should call http for autocomplete', function () {
      var q = 'xxx';
      var expectedRequest = 'http://suggestqueries.google.com/complete/search?client=chrome&q=' + q + '&callback=JSON_CALLBACK';
      sut.autocomplete(q);
      expect(mockHTTP.jsonp).toHaveBeenCalledWith(expectedRequest);
    });

    it('it should not call http for autocomplete if no request text', function () {
      var q = '';
      sut.autocomplete(q);
      expect(mockHTTP.jsonp).not.toHaveBeenCalled();
    });

    it('it should return random word', function () {
      sut.random();
      expect(mockHTTP.jsonp).toHaveBeenCalled();
    });

  });

});
