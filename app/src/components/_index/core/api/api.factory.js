'use strict';
angular
  .module('freelook.info')
  .factory('api', function ($q, $http, CONFIG) {

    function get(url) {
      return proxy(url);
    }

    function _point(_end) {
      return $http.get(CONFIG.API.URL + _end);
    }

    function proxy(url, config) {
      var _cache = config && config.cache ? '/cache' : '';
      return _point('proxy' + _cache + '?url=' + decodeURIComponent(url));
    }

    function goods(q) {
      return _point('goods?q=' + q);
    }

    function facebook(point) {
      return _point('facebook?q=' + point);
    }

    function vk(point) {
      return _point('vk?q=' + point);
    }

    function yandex(point) {
      return _point('yandex/' + point);
    }

    function instagram(point) {
      return _point('instagram?q=' + point);
    }

    return {
      get: get,
      proxy: proxy,
      goods: goods,
      facebook: facebook,
      vk: vk,
      yandex: yandex,
      instagram: instagram
    };

  });


