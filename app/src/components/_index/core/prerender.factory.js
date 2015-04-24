'use strict';
angular
  .module('freelook.info')
  .factory('prerender', function ($q, $http, CONFIG) {

    function get(url) {
      if (url) {
        var api = CONFIG.PRERENDER.URL + encodeURIComponent(url);
        return $http.get(api);
      }
    }

    return {
      get: get
    };

  });


