'use strict';
angular
  .module('freelook.info')
  .factory('apiApp', function ($q, $http, CONFIG) {

    function _enpoint(_end) {
      return CONFIG.API.URL + _end;
    }

    function _point(_end) {
      return $http.get(_enpoint(_end));
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

    function twitter(point) {
      return _point('twitter?q=' + point);
    }

    function promo(point) {
      return _enpoint('promo/' + point);
    }

    return {
      enpoint: _enpoint,
      get: get,
      proxy: proxy,
      goods: goods,
      facebook: facebook,
      vk: vk,
      yandex: yandex,
      instagram: instagram,
      twitter: twitter,
      promo: promo
    };

  });


