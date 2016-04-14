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

    function $get(initPlatform, sendPlatform, CONFIG) {
      var platformName = '';

      function init() {
        initPlatform[name()]();
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

      function origin() {
        var _platformName = name().toUpperCase();
        return CONFIG[_platformName].ORIGIN;
      }

      function send(req, platform) {
        return sendPlatform[platform](req);
      }

      return {
        init: init,
        name: name,
        origin: origin,
        send: send
      };
    }

    return {
      $get: $get,
      isChromeApp: isChromeApp,
      isMobileApp: isMobileApp
    };

  });


