'use strict';

angular
  .module('fli.look')
  .factory('iframe',
  function ($rootScope, url, locale, parser, CONFIG) {

    var origin = _originLink(), proxyUrl = CONFIG.API.URL + 'proxy?url=';

    function _originLink() {
      var link = url.parse(decodeURIComponent($rootScope.fli.route.url));
      return link.protocol + '//' + link.host;
    }

    function proxy(url, path) {
      var decode;
      try {
        decode = decodeURIComponent(url);
      } catch (e) {
        console.error(e);
      }
      return !path ? proxyUrl + decode : path + decode;
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


    function _fliUrl(_url, input) {
      return url.href('look?', {l: locale.getCode(), input: input || null, type: 'full', url: _url});
    }

    function _fixPath(path, customPath) {
      if (path) {
        switch (path.substr(0, 2)) {
          case 'ht':
            return proxy(path, customPath);
          case '//':
            return proxy('http:' + path, customPath);
          default:
            return path.charAt(0) === '/' ? proxy(origin + path, customPath) : proxy(origin + '/' + path, customPath);
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
        var input = $(e).text() || '';
        $(e).attr('href', function (i, href) {
          return _fixPath(href, _fliUrl('', input));
        }).attr('target', '_top');
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
