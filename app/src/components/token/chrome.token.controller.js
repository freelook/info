'use strict';

angular
  .module('fli.token')
  .controller('chrome.token.ctrl',
  function ($window, $scope, user, auth, CONFIG) {

    function _sendUsr(usr) {
      $window.chrome.runtime.sendMessage(CONFIG.CHROME.ID, usr.attributes.authData.facebook,
        function () {
          $window.close();
        });
    }

    function _logIn() {
      auth.logIn().then(function () {
        _init();
      });
    }

    function _init() {
      var usr = user.current();
      if (usr) {
        _sendUsr(usr);
      } else {
        $scope.$on('fbAsyncInit', _logIn);
        _logIn();
      }
    }

    _init();

  });

