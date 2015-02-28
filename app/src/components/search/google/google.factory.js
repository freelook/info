'use strict';
angular
  .module('fli.search')
  .factory('Google', function ($http) {

    function search(q) {

      if (q) {
        var gapi = 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&q=' + q + '&callback=JSON_CALLBACK';
        return $http.jsonp(gapi)
          .error(function () {
            console.info('Sorry error');
          });
      }

    }

    function autocomplete(q) {
      if (q) {
        var gapi = 'http://suggestqueries.google.com/complete/search?client=chrome&q=' + q + '&callback=JSON_CALLBACK';
        return $http.jsonp(gapi)
          .error(function () {
            console.info('Sorry error');
          });
      }
    }

    function random() {
      var wapi = 'http://api.wordnik.com/v4/words.json/randomWord?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5&callback=JSON_CALLBACK';
      return $http.jsonp(wapi, {cache: false})
        .error(function () {
          console.info('Sorry error');
        });
    }


    return {
      search: search,
      autocomplete: autocomplete,
      random: random
    };

  });
