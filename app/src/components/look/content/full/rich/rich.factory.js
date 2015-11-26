'use strict';
angular
  .module('fli.look')
  .factory('rich', function ($q, api, parser, toast) {

    function _htmlToItem(_html, _url) {
      var _item = {}, dom = parser.parseFromString(_html, 'text/html'),
        $dom = $(dom);


      _item.url = _url;
      _item.img = $dom.find('meta[name="twitter:image"]').attr('content') || $dom.find('meta[name="og:image"]').attr('content');
      _item.title = $dom.find('title').text() || $dom.find('meta[name="twitter:title"]').attr('content') || $dom.find('meta[name="og:title"]').attr('content');
      _item.content = $dom.find('meta[name="description"]').attr('content') || $dom.find('meta[name="twitter:description"]').attr('content') || $dom.find('meta[name="og:description"]').attr('content');

      return _item;
    }

    function get(_url) {
      var defer = $q.defer();
      api.proxy(_url)
        .success(function (_html) {
          return defer.resolve(_htmlToItem(_html, _url));
        })
        .error(function (err) {
          toast.error();
          return defer.reject(err);
        });

      return defer.promise;
    }

    return {
      get: get
    };

  });

