'use strict';
angular
  .module('fli.search')
  .factory('google', function ($http) {

    var GAPI = {
      web: 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&num=12',
      image: 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&num=12&searchtype=image'
    };

    function search(q, _type) {
      if (q) {
        var type = _type || 'web',
          gapi = GAPI[type] + '&q=' + q + '&callback=JSON_CALLBACK';
        return $http.jsonp(gapi);
      }
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

    function trends() {
      var gtapi = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://www.google.com/trends/hottrends/atom/hourly&callback=JSON_CALLBACK';
      return $http.jsonp(gtapi);
    }

    return {
      search: search,
      autocomplete: autocomplete,
      random: random,
      trends: trends
    };

  });
