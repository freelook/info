'use strict';
angular
  .module('fli.token')
  .factory('token', function ($window, user, CONFIG) {

    function sendToChrome(usr) {
      if ($window.chrome && $window.chrome.runtime && $window.chrome.runtime.sendMessage && usr) {
        $window.chrome.runtime.sendMessage(CONFIG.CHROME.ID, usr.attributes.authData.facebook,
          function () {
            $window.close();
          });
      }
    }

    return {
      sendToChrome: sendToChrome
    };

  });
