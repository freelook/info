'use strict';
angular
  .module('freelook.info')
  .factory('apiChrome', function ($q, $http, CONFIG) {

    // Todo api core

    function _point(_end) {
      return $http.get(CONFIG.API.URL + _end);
    }

    function proxy(url) {
      return $http.get(url);
    }

    function get(url) {
      return proxy(url);
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


