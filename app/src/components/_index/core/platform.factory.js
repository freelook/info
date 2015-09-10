'use strict';
angular
  .module('freelook.info')
  .factory('platform', function ($window, $parse, CONFIG) {

    var chromeApp = '', platformName = '';

    function init() {
      _initChromeApp();
    }

    function _initChromeApp() {
      if (isChrome()) {
        $window.chrome.runtime.getBackgroundPage(function (_chromeApp) {
          chromeApp = _chromeApp;
        });
      }
    }

    function name() {
      if (platformName) {
        return platformName;
      }
      if (checkChromeApp()) {
        platformName = 'chrome';
        return platformName;
      }
      platformName = 'site';
      return platformName;
    }

    function getOrigin() {
      var _platformName = name().toUpperCase();
      return CONFIG[_platformName].ORIGIN;
    }

    function isChrome() {
      return !!$parse('chrome.runtime.getBackgroundPage')($window);
    }


    function checkChromeApp() {
      return chromeApp;
    }


    return {
      init: init,
      name: name,
      getOrigin: getOrigin,
      isChrome: isChrome,
      checkChromeApp: checkChromeApp
    };

  });


