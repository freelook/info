'use strict';
angular
  .module('freelook.info')
  .factory('inAppBrowser', function ($window) {

    function open(href, _config) {
      var config = _config || 'location=yes';
      if ($window.cordova && $window.cordova.InAppBrowser) {
        return $window.cordova.InAppBrowser.open(href, '_blank', config);
      }

      return $window.open(href, '_blank', config);
    }

    return {
      open: open
    };

  });


