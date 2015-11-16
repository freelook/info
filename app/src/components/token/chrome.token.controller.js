'use strict';

angular
  .module('fli.token')
  .controller('chrome.token.ctrl',
  function ($window, user, auth, token, CONFIG) {

    function _logIn() {
      auth.logIn({redirectUri: CONFIG.SITE.ORIGIN + 'token?chrome=1'});
    }

    function _init() {
      var usr = user.current();
      if (usr) {
        token.sendToChrome(usr);
      } else {
        _logIn();
      }
    }

    _init();

  });

