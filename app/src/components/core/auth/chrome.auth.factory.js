'use strict';
angular
  .module('freelook.info')
  .factory('authChrome', function (user, url, Firebase, CONFIG) {

    var authObj = Firebase.ref();

    authObj.onAuth(function () {
      user.init();
    });

    function _storeAuthData(authData) {
      Firebase.ref('users').child(authData.uid).child('authData').set(authData);
    }

    function logIn(provider) {
      window.chrome.runtime.onMessage.addListener(function (req) {
        authObj.authWithOAuthToken(req.provider, req.token).then(function (authData) {
          _storeAuthData(authData);
        });
      });

      url.link(CONFIG.SITE.ORIGIN + 'token/chrome?provider=' + provider);
    }

    function logOut() {
      return authObj.unauth();
    }

    return {
      logIn: logIn,
      logOut: logOut,
      data: user.authData
    };

  });
