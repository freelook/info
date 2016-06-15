'use strict';
angular
  .module('fli.look')
  .factory('rich', function ($q, api, parser, content, full, toast, user) {

    function _htmlToItem(_html, _url) {
      var _item = {}, dom = parser.parseFromString(_html, 'text/html'),
        $dom = $(dom), site = content.site(_url);

      _item.url = _url;
      _item.img = full.fixHref($dom.find('meta[name="twitter:image"]').attr('content') ||
          $dom.find('meta[name="og:image"]').attr('content') ||
          $dom.find('link[rel="apple-touch-icon"]').attr('href') ||
          $dom.find('meta[name="og:image"]').attr('content') ||
          $dom.find('link[rel="apple-touch-icon"]').attr('href') ||
          $dom.find('link[rel="shortcut icon"]').attr('href') ||
          $dom.find('link[rel="icon"]').attr('href'), site.origin) ||
        site.origin + '/favicon.ico';
      _item.title = $dom.find('title').text() ||
        $dom.find('meta[name="twitter:title"]').attr('content') ||
        $dom.find('meta[name="og:title"]').attr('content');
      _item.content = $dom.find('meta[name="description"]').attr('content') ||
        $dom.find('meta[name="twitter:description"]').attr('content') ||
        $dom.find('meta[name="og:description"]').attr('content');
      _item.rss = full.getRSS($dom, _url);

      return _item;
    }

    function get(_url) {
      var defer = $q.defer();
      api.proxy(_url)
        .success(function (_html) {
          return defer.resolve(_htmlToItem(_html, _url));
        })
        .error(function (err) {
          return defer.reject(err);
        });

      return defer.promise;
    }

    function subscribe(_item) {
      if (_item && _item.url && _item.rss) {
        user.feeds.addItem('subscription', _item);
        toast.show('look.subscribed', {v: _item.title || ''});
      }
    }

    return {
      get: get,
      subscribe: subscribe
    };

  });

