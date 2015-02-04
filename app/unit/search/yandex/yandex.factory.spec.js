'use strict';

describe('Yandex', function () {

  var sut, mockApi;

  beforeEach(function () {
    module('fli.search');

    mockApi = {
      get: jasmine.createSpy().and.returnValue({
        then: jasmine.createSpy()
      })
    };


    module(function ($provide) {
      $provide.value('api', mockApi);
    });
  });

  beforeEach(inject(function (Yandex) {
    sut = Yandex;
  }));

  describe('Yandex calls', function () {

    it('it should resolve url for search', function () {
      var text = 'xxx',
        expectedRequest = 'https://yandex.com/sitesearch?text=' + text + '&searchid=2192226&frame=1';
      sut.search(text);
      expect(mockApi.get).toHaveBeenCalledWith(expectedRequest);
    });

  });

});
