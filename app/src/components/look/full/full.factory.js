'use strict';

angular
  .module('fli.look')
  .factory('full', function ($sce, $window, $location, $rootScope, $cacheFactory, CONFIG) {

    var cache = $cacheFactory('full'),
      parser = new window.DOMParser();

    function _originLink() {
      var link = $window.document.createElement('a');
      link.href = $rootScope.fli.route.url;
      return link.protocol + '//' + link.host;
    }

    function _fliUrl(url) {
      return CONFIG.ORIGIN + 'look?input=' + $rootScope.fli.route.input + '&url=' + url;
    }

    function _prepareHtml(html) {
      var dom = parser.parseFromString(html, 'text/html'),
        $dom = $(dom),
        origin = _originLink(),
        content = '';

      $dom.find('a').each(function (i, e) {
        $(e).attr('href', function (i, href) {
          if (href) {
            switch (href.substr(0, 1)) {
              case 'h':
                return _fliUrl(href);
              case 'm':
                return href;
              default:
                return _fliUrl(origin + href);
            }
          }
        });
      });

      $dom.find('script, iframe').remove();
      content = $sce.trustAsHtml(dom.documentElement.innerHTML);

      _storeData(content);

      return content;
    }

    function _storeData(data) {
      cache.put($location.url(), data);
    }

    function get(html) {
      return cache.get($location.url()) || _prepareHtml(html);
    }

    return {
      get: get
    };

  });
