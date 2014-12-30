'use strict';

describe('Yandex service', function () {

  var sut, mockHTTP, mockQ, mockResoleve;

  beforeEach(function () {
    module('fli.search');

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

  beforeEach(inject(function (Yandex) {
    sut = Yandex;
  }));

  describe('Yandex calls', function () {

    it('it should resolve url for search', function () {
      var text = 'xxx',
        expectedRequest = 'http://freelook.herokuapp.com/api/get?url=' +
          encodeURIComponent('https://yandex.com/sitesearch?text=' + text + '&searchid=2192226&frame=1') + '&callback=JSON_CALLBACK';
      sut.search(text);
      expect(mockHTTP.jsonp).toHaveBeenCalledWith(expectedRequest);
    });

    it('it should resolve html for search', function () {
      var text = 'xxx',
        html = '<div><div class="b-serp-item">' +
          '<div class="b-serp-item__title"><a href="http://xxx.com"><span>title</span></a></div>' +
          '<div class="b-serp-item__text">text</div>' +
          '</div></div>',
        expectedJS = [{
          url: 'http://xxx.com',
          title: 'title',
          text: 'text'
        }];
      sut.search(text);
      mockHTTP.jsonp(text).success.calls.mostRecent().args[0](html);
      expect(mockResoleve).toHaveBeenCalledWith(expectedJS);
    });

  });

});
