'use strict';
angular
  .module('freelook.info')
  .factory('google', function ($http, googleUrl, locale) {

    var GAPI = {
      web: 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&num=12',
      image: 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&num=12&searchtype=image'
    };

    function _search(q, _type) {
      if (q) {
        var type = _type || 'web',
          gapi = GAPI[type] + '&q=' + q + '&callback=JSON_CALLBACK';
        return $http.jsonp(gapi);
      }
    }

    function web(q) {
      return _search(q, 'web');
    }

    function image(q) {
      return _search(q, 'image');
    }

    function autocomplete(q) {
      if (q) {
        var gapi = 'http://suggestqueries.google.com/complete/search?client=chrome&q=' + q + '&callback=JSON_CALLBACK';
        return $http.jsonp(gapi);
      }
    }

    function random() {
      var wapi = 'http://api.wordnik.com/v4/words.json/randomWord?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5&callback=JSON_CALLBACK';
      return $http.jsonp(wapi, {cache: false});
    }

    function feeds(point) {
      var gfapi = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=24&q=' + encodeURIComponent(point) + '&callback=JSON_CALLBACK';
      return $http.jsonp(gfapi);
    }

    function trends() {
      var gtapi = 'http://www.google.com/trends/hottrends/atom/hourly?pn=' + locale.getPnCode();
      return feeds(gtapi);
    }

    function news(q) {
      var gnapi = 'http://news.google.com/news?q=' + q + '&output=rss&ned=' + locale.getNedCodes();
      return feeds(gnapi);
    }

    function video(q) {
      var gvapi = 'https://ajax.googleapis.com/ajax/services/search/video?&v=1.0&rsz=8&q=' + encodeURIComponent(q) + '&callback=JSON_CALLBACK';
      return $http.jsonp(gvapi);
    }

    return {
      web: web,
      image: image,
      autocomplete: autocomplete,
      random: random,
      trends: trends,
      news: news,
      url: googleUrl,
      video: video
    };

  });
