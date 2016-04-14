'use strict';
angular
  .module('fli.core')
  .factory('googleUrl', function ($http, CONFIG, GAPI) {

    var API_ENDPOINT = GAPI.url + CONFIG.API.GOOGLE.KEY;

    function insert(longUrl) {
      return $http.post(API_ENDPOINT, {
        longUrl: longUrl
      });
    }

    function get(shortUrl) {
      return $http.get(API_ENDPOINT + '&shortUrl=' + shortUrl);
    }

    return {
      insert: insert,
      get: get
    };

  });
