'use strict';
angular
  .module('freelook.info')
  .factory('Firebase', function ($window, CONFIG) {

    function ref(path) {
      return new $window.Firebase([CONFIG.API.FIREBASE.URL, path || ''].join(''));
    }

    return {
      ref: ref
    };

  });


