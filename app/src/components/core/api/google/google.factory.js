'use strict';
angular
  .module('fli.core')
  .factory('google', function ($http, $parse, httpAdapter, url, googleUrl, googlePlus, locale, platform, GAPI, CONFIG) {

    var APP_ID = CONFIG.API.GOOGLE.ID;

    function _search(q, _type) {
      if (q) {
        var type = _type || 'web';
        return httpAdapter(GAPI[type] + q);
      }
    }

    function web(q) {
      return _search(q, 'web');
    }

    function image(q) {
      return _search(q, 'image');
    }

    function autocomplete(q) {
      return httpAdapter(GAPI.autocomplete + q);
    }

    function random() {
      return httpAdapter(GAPI.random, {cache: false});
    }

    function feeds(point) {
      return httpAdapter(GAPI.feeds + url.encode(point));
    }

    function trends() {
      return feeds(GAPI.trends + locale.getPnCode());
    }

    function news(q) {
      return feeds(GAPI.news + q + '&ned=' + locale.getNedCodes());
    }

    function video(q) {
      return httpAdapter(GAPI.video + url.encode(q));
    }

    function logIn() {
      var redirectUri = CONFIG.SITE.ORIGIN + 'token?platform=' + platform.name();
      return url.link('https://accounts.google.com/o/oauth2/auth?client_id=' + APP_ID +
        '&response_type=token&redirect_uri=' + redirectUri +
        '&scope=https://www.googleapis.com/auth/plus.login');
    }

    function img(user) {
      var image = $parse('image.url')(user) || '';
      return image.replace('sz=50', 'sz=100');
    }

    function data(point, token) {
      return googlePlus.data(point, token);
    }

    function me(token) {
      return data('people/me' + '?access_token=' + token);
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
      plus: googlePlus,
      logIn: logIn,
      data: data,
      me: me,
      img: img
    };

  })
  .constant('GAPI', {
    web: 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&num=12&q=',
    image: 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&num=12&searchtype=image&q=',
    autocomplete: 'http://suggestqueries.google.com/complete/search?client=chrome&q=',
    random: 'http://api.wordnik.com/v4/words.json/randomWord?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
    feeds: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=24&q=',
    trends: 'http://www.google.com/trends/hottrends/atom/hourly?pn=',
    news: 'http://news.google.com/news?output=rss&q=',
    video: 'https://ajax.googleapis.com/ajax/services/search/video?&v=1.0&rsz=8&q=',
    url: 'https://www.googleapis.com/urlshortener/v1/url?key=',
    plus: 'https://www.googleapis.com/plus/v1/'
  });
