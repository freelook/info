'use strict';
angular
  .module('freelook.info')
  .factory('googleChrome', function ($http, googleUrl, googlePlus, locale, GAPI) {

    function _search(q, _type) {
      if (q) {
        var type = _type || 'web';
        return $http.get(GAPI[type] + q);
      }
    }

    function web(q) {
      return _search(q, 'web');
    }

    function image(q) {
      return _search(q, 'image');
    }

    function autocomplete(q) {
      return $http.get(GAPI.autocomplete + q);
    }

    function random() {
      return $http.get(GAPI.random, {cache: false});
    }

    function feeds(point) {
      return $http.get(GAPI.feeds + encodeURIComponent(point));
    }

    function trends() {
      return feeds(GAPI.trends + locale.getPnCode());
    }

    function news(q) {
      return feeds(GAPI.news + q + '&ned=' + locale.getNedCodes());
    }

    function video(q) {
      return $http.get(GAPI.video + encodeURIComponent(q));
    }

    return {
      web: web,
      image: image,
      autocomplete: autocomplete,
      random: random,
      trends: trends,
      news: news,
      video: video,
      url: googleUrl,
      plus: googlePlus
    };

  });
