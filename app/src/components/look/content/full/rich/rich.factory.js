'use strict';
angular
  .module('fli.look')
  .factory('rich', function ($q, api, parser, toast) {

    function _htmlToItem(_html) {
      var _item = {}, dom = parser.parseFromString(_html, 'text/html'),
        $dom = $(dom);

      _item.title = $dom.find('title').text();
      _item.content = $dom.find('meta[name="description"]').attr('content') || $dom.find('meta[name="twitter:description"]').attr('content');

      return _item;
    }

    function get(_url) {
      var defer = $q.defer();
      api.proxy(_url)
        .success(function (_html) {
          return defer.resolve(_htmlToItem(_html));
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

