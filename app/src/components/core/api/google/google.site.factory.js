'use strict';
angular
  .module('freelook.info')
  .factory('googleSite', function ($http, googleUrl, googlePlus, locale, GAPI) {

    function _search(q, _type) {
      if (q) {
        var type = _type || 'web';
        return $http.jsonp(GAPI[type] + q + '&callback=JSON_CALLBACK');
      }
    }

    function web(q) {
      return _search(q, 'web');
    }

    function image(q) {
      return _search(q, 'image');
    }

    function autocomplete(q) {
      return $http.jsonp(GAPI.autocomplete + q + '&callback=JSON_CALLBACK');
    }

    function random() {
      return $http.jsonp(GAPI.random + '&callback=JSON_CALLBACK', {cache: false});
    }

    function feeds(point) {
      return $http.jsonp(GAPI.feeds + encodeURIComponent(decodeURIComponent(point)) + '&callback=JSON_CALLBACK');
    }

    function trends() {
      return feeds(GAPI.trends + locale.getPnCode());
    }

    function news(q) {
      return feeds(GAPI.news + q + '&ned=' + locale.getNedCodes());
    }

    function video(q) {
      return $http.jsonp(GAPI.video + encodeURIComponent(decodeURIComponent(q)) + '&callback=JSON_CALLBACK');
    }

    return {
      web: web,
      image: image,
      autocomplete: autocomplete,
      random: random,
      trends: trends,
      news: news,
      video: video,
      feeds: feeds,
      url: googleUrl,
      plus: googlePlus
    };

  });
