'use strict';
angular
  .module('freelook.info')
  .factory('platform', function ($window, $parse, $rootScope, $timeout, CONFIG) {

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
        });
      }
    }


    return {
      name: name,
      getOrigin: getOrigin,
      isChromeApp: isChromeApp,
      initChromeApp: initChromeApp
    };

  });


