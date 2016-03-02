'use strict';
angular
  .module('fli.token')
  .factory('token', function ($window, CONFIG) {

    function sendToChrome(req) {
      if ($window.chrome && $window.chrome.runtime && $window.chrome.runtime.sendMessage) {
        $window.chrome.runtime.sendMessage(CONFIG.CHROME.ID, req,
          function () {
            $window.close();
          });
      }
    }

    return {
      sendToChrome: sendToChrome
    };

  });
