'use strict';

angular
  .module('fli.token')
  .controller('token.ctrl',
  function ($window, CONFIG) {

    $window.chrome.runtime.sendMessage(CONFIG.CHROME.ID, {token: $window.location.href},
      function () {
        $window.close();
      });

  });

