'use strict';
angular
  .module('fli.core')
  .provider('platform', function () {

    function isChromeApp() {
      return !!(window.chrome && window.chrome.runtime && window.chrome.runtime.getBackgroundPage);
    }

    function isMobileApp() {
      return !!window._cordovaNative;
    }

    function $get($window, $parse, $rootScope, $timeout, $q, CONFIG) {
      var platformName = '',
        initPlatforms = {
          chrome: function () {
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
          },
          site: angular.noop,
          mobile: angular.noop
        };

      function init() {
        initPlatforms[name()]();
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

      function sendToChrome(req) {
        if ($parse('chrome.runtime.sendMessage')($window)) {
          return $q(function (resolve, reject) {
            $window.chrome.runtime.sendMessage(CONFIG.CHROME.ID, req, function (res) {
              if (res) {
                return resolve(res);
              }
              return reject(res);
            });
          });
        }
        return $q.reject();
      }


      return {
        init: init,
        name: name,
        getOrigin: getOrigin,
        sendToChrome: sendToChrome
      };
    }

    return {
      $get: $get,
      isChromeApp: isChromeApp,
      isMobileApp: isMobileApp
    };

  });


