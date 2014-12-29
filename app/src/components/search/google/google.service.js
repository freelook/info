'use strict';
angular
  .module('fli.search')
  .factory('Google', function ($http) {

    function search(q) {

      if (q) {
        var gapi = 'https://www.googleapis.com/customsearch/v1element?key=AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY&cx=007077922014062052604:wiiu7xrm8yk&q=' + q + '&callback=JSON_CALLBACK';
        return $http.jsonp(gapi);
      }

    }

    function autocomplete (q) {
      if (q) {
        var gapi = 'http://suggestqueries.google.com/complete/search?client=chrome&q=' + q + '&callback=JSON_CALLBACK';
        return $http.jsonp(gapi);
      }
    }

    return {
      search: search,
      autocomplete: autocomplete
    };

  });
