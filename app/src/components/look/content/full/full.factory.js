'use strict';

angular
  .module('fli.look')
  .factory('full',
  function ($sce, $location, $rootScope, $cacheFactory, locale, readability, url, parser) {

    var cache = $cacheFactory('full');

    function _originLink() {
      var link = url.parse(decodeURIComponent($rootScope.fli.route.url));
      return link.protocol + '//' + link.host;
    }

    function _fliUrl(_url, input) {
      return url.href('look?', {l: locale.getCode(), input: input || null, url: _url});
    }

    function _prepareHtml(html, title) {
      var dom = parser.parseFromString(html, 'text/html'),
        $dom = $(dom);

      readability.init(dom, title);
      _fixLink($dom);
      _fixImg($dom);

      var content = $sce.trustAsHtml(dom.documentElement.innerHTML);

      _storeData(content);

      return content;
    }

    function _storeData(data) {
      cache.put($location.url(), data);
    }

    function _fixImg($dom) {
      var origin = _originLink();
      $dom.find('img').each(function (i, e) {
        $(e).attr('src', function (i, src) {
          if (src) {
            switch (src.substr(0, 2)) {
              case 'ht':
              case '//':
                return src;
              default:
                return src.charAt(0) === '/' ? origin + src : origin + '/' + src;
            }
          }
        });
      });
    }

    function _fixLink($dom) {
      var origin = _originLink();
      $dom.find('a').each(function (i, e) {
        var input = $(e).text() || '';
        $(e).attr('target', '_self');
        $(e).attr('href', function (i, href) {
          if (href) {
            switch (href.substr(0, 2)) {
              case 'ht':
              case '//':
                return _fliUrl(href, input);
              case 'ma':
                return href;
              default:
                return href.charAt(0) === '/' ? _fliUrl(origin + href, input) : _fliUrl(origin + '/' + href, input);
            }
          }
        });
      });
    }

    function get(html, title) {
      return cache.get($location.url()) || _prepareHtml(html, title);
    }

    return {
      get: get
    };

  });
