'use strict';
angular
  .module('freelook.info')
  .factory('apiSite', function ($http, promise, url, toast, CONFIG) {

    function _enpoint(_end) {
      return CONFIG.API.URL + _end;
    }

    function _point(_end) {
      return $http.get(_enpoint(_end));
    }

    function proxy(_url, config) {
      var _cache = config && config.cache ? '/cache' : '',
        decodedUrl = url.decode(_url),
        defer = promise.defer();

      _point('proxy' + _cache + '/' + decodedUrl)
        .success(function (res) {
          defer.resolve(res);
        })
        .error(function () {
          $http.get('https://webcache.googleusercontent.com/search?q=cache:' + decodedUrl)
            .success(function (res) {
              defer.resolve(res);
            })
            .error(function (err) {
              toast.useApps();
              defer.reject(err);
            });
        });

      return defer.promise;
    }

    function get(_url) {
      return proxy(_url);
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

    function foursquare(point) {
      return _point('foursquare?q=' + point);
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
      foursquare: foursquare,
      promo: promo
    };

  });


