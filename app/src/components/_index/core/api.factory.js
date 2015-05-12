'use strict';
angular
  .module('freelook.info')
  .factory('api', function ($q, $http, CONFIG) {

    function get(url) {
      if (url) {
        var api = CONFIG.API.URL + 'get?url=' + url;
        return $http.get(api);
      }
    }

    return {
      get: get
    };

  });


