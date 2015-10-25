'use strict';
angular
  .module('freelook.info')
  .factory('splash', function ($window, $parse) {

    function hide() {
      if ($parse('navigator.splashscreen.hide')($window)) {
        $window.navigator.splashscreen.hide();
      }
    }

    return {
      hide: hide
    };

  });


