'use strict';
angular
  .module('fli.core')
  .factory('initPlatform', function ($window, $rootScope, $parse, $timeout, CONFIG) {

    function chrome() {
      $window.chrome.runtime.getBackgroundPage(function (page) {
        var url = $parse('params.url')(page) || '',
          path = url.split(CONFIG.PRODUCTION).splice(1)[0];
        if (path) {
          $timeout(function () {
            $rootScope.go('/' + path);
          });
        }
        if ($window.Firebase && $window.Firebase.INTERNAL) {
          $window.Firebase.INTERNAL.forceWebSockets();
        }
      });
    }

    return {
      chrome: chrome,
      site: angular.noop,
      mobile: angular.noop
    };

  });

