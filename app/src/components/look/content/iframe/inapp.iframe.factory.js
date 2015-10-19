'use strict';

angular
  .module('fli.look')
  .factory('inAppIframe',
  function ($window) {

    function open(url) {
      if ($window.cordova && $window.cordova.InAppBrowser) {
        return $window.cordova.InAppBrowser.open(url, '_blank', 'location=yes');
      }

      return $window.open(url, '_blank', 'location=yes');
    }

    return {
      open: open
    };

  });
