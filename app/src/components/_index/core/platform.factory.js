'use strict';
angular
  .module('freelook.info')
  .factory('platform', function ($window, $parse, CONFIG) {

    var platformName = '';

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

    function isChromeApp() {
      return !!$parse('chrome.runtime.getBackgroundPage')($window);
    }

    function isMobileApp() {
      return !!$parse('_cordovaNative')($window);
    }

    function getChromeApp() {
      if (isChromeApp()) {
        $window.chrome.runtime.getBackgroundPage(function () {
          // TODO resolve _chromeApp
        });
      }
    }


    return {
      name: name,
      getOrigin: getOrigin,
      isChromeApp: isChromeApp,
      getChromeApp: getChromeApp
    };

  });


