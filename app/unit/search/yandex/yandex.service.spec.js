'use strict';

describe('Yandex service', function () {

  var sut, mockHTTP, mockQ, mockResoleve;

  beforeEach(function () {
    module('fli.search');

    mockHTTP = {
      jsonp: jasmine.createSpy().and.returnValue({
        success: jasmine.createSpy()
      })
    };

    mockResoleve = jasmine.createSpy();

    mockQ = {
      defer: jasmine.createSpy().and.returnValue({
        resolve: mockResoleve,
        promise: jasmine.createSpy()
      })
    };

    module(function ($provide) {
      $provide.value('$http', mockHTTP);
      $provide.value('$q', mockQ);
    });
  });

  beforeEach(inject(function (Yandex) {
    sut = Yandex;
  }));

  describe('Yandex calls', function () {

    it('it should resolve url for search', function () {
      var text = 'xxx';
      var expectedRequest = 'https://yandex.com/sitesearch?text=' + text + '&searchid=2192226&frame=1';
      sut.search(text);
      expect(mockResoleve).toHaveBeenCalledWith(expectedRequest);
    });


  });

});
