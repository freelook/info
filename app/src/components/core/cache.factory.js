'use strict';
angular
  .module('freelook.info')
  .factory('cache', function ($http, CacheFactory) {

    function init() {
      $http.defaults.cache = CacheFactory('defaults', {
        maxAge: 60 * 60 * 1000,
        deleteOnExpire: 'aggressive',
        storageMode: 'sessionStorage'
      });
    }

    return {
      init: init
    };

  });


