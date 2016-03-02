'use strict';

angular
  .module('fli.token')
  .controller('chrome.token.ctrl',
  function ($routeParams, token, auth) {

    function init() {
      var authData = auth.data();
      if (authData.uid && authData.provider === $routeParams.provider) {
        token.sendToChrome({
          provider: authData.provider,
          token: authData[authData.provider].accessToken
        });
      } else {
        auth.logIn($routeParams.provider).then(init);
      }
    }

    init();

  });
