'use strict';
angular
  .module('freelook.info')
  .factory('analytics', function ($window, $rootScope, $location) {

    function init() {
      $rootScope.$on('$routeChangeSuccess', function () {
        if ($window.ga) {
          $window.ga('send', 'pageview', {page: decodeURIComponent($location.url())});
        }
      });
    }

    return {
      init: init
    };

  });


