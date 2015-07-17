'use strict';
angular
  .module('freelook.info')
  .factory('api', function ($q, $http, CONFIG) {

    function get(url) {
      return proxy(url);
    }

    function proxy(url, config) {
      if (url) {
        var _cache = config && config.cache ? '/cache' : '',
          api = CONFIG.API.URL + 'proxy' + _cache + '?url=' + decodeURIComponent(url);
        return $http.get(api);
      }
    }

    function goods(q) {
      if (q) {
        var api = CONFIG.API.URL + 'goods?q=' + q;
        return $http.get(api);
      }
    }

    function facebook(point) {
      if (point) {
        var api = CONFIG.API.URL + 'facebook/' + point;
        return $http.get(api);
      }
    }

    function vk(point) {
      if (point) {
        var api = CONFIG.API.URL + 'vk/' + point;
        return $http.get(api);
      }
    }

    function yandex(point) {
      if (point) {
        var api = CONFIG.API.URL + 'yandex/' + point;
        return $http.get(api);
      }
    }

    return {
      get: get,
      proxy: proxy,
      goods: goods,
      facebook: facebook,
      vk: vk,
      yandex: yandex
    };

  });


