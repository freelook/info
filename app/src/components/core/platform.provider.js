'use strict';
angular
  .module('freelook.info')
  .provider('platform', function () {

    function isChromeApp() {
      return window.chrome && window.chrome.runtime && window.chrome.runtime.getBackgroundPage;
    }

    function $get($window, $parse, $rootScope, $timeout, CONFIG) {
      var platformName = '';

      function init() {
        initChromeApp();
      }

      function name() {
        if (platformName) {
          return platformName;
        }
        if (isChromeApp()) {
          platformName = 'chrome';
          return platformName;
        }
        if (isMobileApp()) {
          platformName = 'mobile';
          return platformName;
        }
        platformName = 'site';
        return platformName;
      }

      function getOrigin() {
        var _platformName = name().toUpperCase();
        return CONFIG[_platformName].ORIGIN;
      }

      function isMobileApp() {
        return !!$parse('_cordovaNative')($window);
      }

      function initChromeApp() {
        if (isChromeApp()) {
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
      }

      return {
        init: init,
        name: name,
        getOrigin: getOrigin,
        isChromeApp: isChromeApp
      };
    }

    return {
      $get: $get,
      isChromeApp: isChromeApp
    };

  });


