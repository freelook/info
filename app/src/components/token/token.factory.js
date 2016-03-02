'use strict';
angular
  .module('fli.token')
  .factory('token', function ($window, platform) {

    function sendToChrome(req) {
      platform.sendToChrome(req).finally(function () {
        $window.close();
      });
    }

    return {
      sendToChrome: sendToChrome
    };

  });
