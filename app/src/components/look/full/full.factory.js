'use strict';

angular
  .module('fli.look')
  .factory('full', function ($sce, $window, $location, $rootScope, $cacheFactory, short) {

    var cache = $cacheFactory('full'),
      parser = new window.DOMParser();

    function _prepareHtml(html) {
      var dom = parser.parseFromString(html, 'text/html'),
        $dom = $(dom),
        data = '';

      $dom.find('link').each(function (i, e) {
        $(e).attr('href', function (i, value) {
          if (value) {
            switch (value.substr(0, 2)) {
              case 'ht':
              case '//':
                return value;
              case '/':
                return $rootScope.fli.route.url + value;
              default:
                return $rootScope.fli.route.url + '/' + value;
            }
          }
        });
      });

      $dom.find('script, iframe').remove();
      short.fixLinks($dom, 'full');
      data = $sce.trustAsHtml(dom.documentElement.innerHTML);

      _storeData(data);

      return data;
    }

    function _storeData(data) {
      cache.put($location.url(), data);
    }

    function get(html, by) {
      return cache.get($location.url()) || _prepareHtml(html, by);
    }

    return {
      get: get
    };

  });
