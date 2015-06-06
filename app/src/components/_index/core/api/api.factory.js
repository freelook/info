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

    function goods(q) {
      if (q) {
        var api = CONFIG.API.URL + 'goods?q=' + q;
        return $http.get(api);
      }
    }

    return {
      get: get,
      goods: goods
    };

  });


