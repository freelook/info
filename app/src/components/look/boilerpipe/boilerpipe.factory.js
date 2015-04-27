'use strict';
angular
  .module('fli.look')
  .factory('boilerpipe', function ($http, CONFIG, api) {

    function get(url) {
      return api.get(url);
    }

    return {
      get: get
    };

  });

