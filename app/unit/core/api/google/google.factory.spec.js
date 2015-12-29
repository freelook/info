'use strict';


describe('Google', function () {

  var sut, mockHTTP, mockToast;

  beforeEach(function () {
    module('freelook.info');

    mockToast = {
      show: jasmine.createSpy()
    };

    module(function ($provide) {
      $provide.value('toast', mockToast);
    });
  });

  beforeEach(inject(function (google, $http) {
    sut = google;
    mockHTTP = spyOn($http, 'jsonp').and.callThrough();
  }));

  describe('HTTP calls', function () {

    it('it should call http for web search', function () {
      var q = 'xxx';
      var expectedRequest = 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&num=12&q=' + q + '&callback=JSON_CALLBACK';
      sut.web(q);
      expect(mockHTTP).toHaveBeenCalledWith(expectedRequest);
    });

    it('it should not call http for web search if no request text', function () {
      var q = '';
      sut.web(q);
      expect(mockHTTP).not.toHaveBeenCalled();
    });

    it('it should call http for autocomplete', function () {
      var q = 'xxx';
      var expectedRequest = 'http://suggestqueries.google.com/complete/search?client=chrome&q=' + q + '&callback=JSON_CALLBACK';
      sut.autocomplete(q);
      expect(mockHTTP).toHaveBeenCalledWith(expectedRequest);
    });

    it('it should not call http for autocomplete if no request text', function () {
      var q = '';
      sut.autocomplete(q);
      expect(mockHTTP).toHaveBeenCalled();
    });

    it('it should return random word', function () {
      sut.random();
      expect(mockHTTP).toHaveBeenCalled();
    });

  });

});
