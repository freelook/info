'use strict';

describe('Yandex', function () {

  var sut, mockPrerender;

  beforeEach(function () {
    module('fli.search');

    mockPrerender = {
      get: jasmine.createSpy().and.returnValue({
        then: jasmine.createSpy()
      })
    };


    module(function ($provide) {
      $provide.value('prerender', mockPrerender);
    });
  });

  beforeEach(inject(function (yandex) {
    sut = yandex;
  }));

  describe('Yandex calls', function () {

    it('it should resolve url for search', function () {
      var text = 'xxx',
        expectedRequest = 'https://yandex.com/sitesearch?text=' + text + '&searchid=2192226&frame=1';
      sut.search(text);
      expect(mockPrerender.get).toHaveBeenCalledWith(expectedRequest);
    });

  });

});
