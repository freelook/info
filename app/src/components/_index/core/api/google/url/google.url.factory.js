'use strict';
angular
  .module('freelook.info')
  .factory('googleUrl', function ($http, CONFIG) {

    var APP_KEY = CONFIG.API.GOOGLE.KEY,
      API_ENDPOINT = 'https://www.googleapis.com/urlshortener/v1/url?key=' + APP_KEY;

    function insert(longUrl) {
      return $http.post(API_ENDPOINT, {
        longUrl: longUrl
      });
    }

    function get(shortUrl) {
      var gugapi = API_ENDPOINT + '&shortUrl=' + shortUrl;
      return $http.get(gugapi);
    }


    return {
      insert: insert,
      get: get
    };

  });
