'use strict';

describe('Boilerpipe', function () {

  var sut, mockHTTP, mockCONFIG;

  beforeEach(function () {
    module('freelook.info');
    module('fli.look');

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

  beforeEach(inject(function (CONFIG, boilerpipe) {
    sut = boilerpipe;
    mockCONFIG = CONFIG;
  }));

  describe('Boilerpipe calls', function () {

    it('it should resolve url for get request', function () {
      var url = 'http://xxx.com';
      var expUrl = mockCONFIG.API.URL + 'boilerpipe/extract?url=' + url + '&extractor=ArticleExtractor&output=json&extractImages=3';
      sut.get(url);
      expect(mockHTTP.get).toHaveBeenCalledWith(expUrl);
    });

  });

});
