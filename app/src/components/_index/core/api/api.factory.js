'use strict';
angular
  .module('freelook.info')
  .factory('api', function ($q, $http, CONFIG) {

    function get(url) {
      if (url) {
        var api = CONFIG.API.URL + 'get?url=' + url;
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

    function proxy(url) {
      if (url) {
        var api = CONFIG.API.URL + 'proxy?url' + decodeURIComponent(url);
        return $http.get(api);
      }
    }

    return {
      get: get,
      goods: goods,
      facebook: facebook,
      vk: vk,
      yandex: yandex,
      proxy: proxy
    };

  });


