'use strict';

angular
  .module('fli.look')
  .factory('full',
  function ($sce, $window, $location, $rootScope, $cacheFactory, readability, CONFIG) {

    var cache = $cacheFactory('full'),
      parser = new window.DOMParser();

    function _originLink() {
      var link = $window.document.createElement('a');
      link.href = decodeURIComponent($rootScope.fli.route.url);
      return link.protocol + '//' + link.host;
    }

    function _fliUrl(url, input) {
      if (!input) {
        return CONFIG.ORIGIN + 'look?url=' + url;
      }
      return CONFIG.ORIGIN + 'look?input=' + input + '&url=' + url;
    }

    function _prepareHtml(html) {
      var dom = parser.parseFromString(html, 'text/html'),
        $dom = $(dom);

      readability.init(dom);
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

    function link(html) {
      var dom = parser.parseFromString(html, 'text/html'),
        $dom = $(dom);
      _fixLink($dom);
      return $sce.trustAsHtml(dom.documentElement.innerHTML);
    }

    function get(html) {
      return cache.get($location.url()) || _prepareHtml(html);
    }

    return {
      link: link,
      get: get
    };

  });
