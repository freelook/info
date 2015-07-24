'use strict';

angular
  .module('fli.look')
  .factory('iframe',
  function ($rootScope, url, CONFIG) {

    var parser = new window.DOMParser(),
      origin = _originLink(), proxyUrl = CONFIG.API.URL + 'proxy?url=';

    function _originLink() {
      var link = url.parse(decodeURIComponent($rootScope.fli.route.url));
      return link.protocol + '//' + link.host;
    }

    function proxy(url) {
      return proxyUrl + decodeURIComponent(url);
    }

    function _prepareHtml(html) {
      var dom = parser.parseFromString(html, 'text/html'),
        $dom = $(dom);

      _fixCss($dom);
      _fixScript($dom);
      _fixImg($dom);
      _fixLink($dom);

      return dom.documentElement.innerHTML;
    }

    function _fixPath(path) {
      if (path) {
        switch (path.substr(0, 2)) {
          case 'ht':
            return proxy(path);
          case '//':
            return proxy('http:' + path);
          default:
            return path.charAt(0) === '/' ? proxy(origin + path) : proxy(origin + '/' + path);
        }
      }
    }

    function _fixCss($dom) {
      $dom.find('link').each(function (i, e) {
        $(e).attr('href', function (i, href) {
          return _fixPath(href);
        });
      });
    }

    function _fixImg($dom) {
      $dom.find('img').each(function (i, e) {
        $(e).attr('src', function (i, src) {
          return _fixPath(src);
        });
      });
    }

    function _fixLink($dom) {
      $dom.find('a').each(function (i, e) {
        $(e).attr('href', '#').attr('onclick', 'return false;');
      });
    }

    function _fixScript($dom) {
      $dom.find('script').each(function (i, e) {
        $(e).attr('src', function (i, src) {
          return _fixPath(src);
        });
      });
    }

    function get(html) {
      return _prepareHtml(html);
    }

    return {
      get: get
    };

  });
