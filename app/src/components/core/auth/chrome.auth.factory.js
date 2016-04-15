'use strict';
angular
  .module('freelook.info')
  .factory('authChrome', function ($q, $window, facebook, google) {

    var authProviders = {
      google: google,
      facebook: facebook
    };

    function logIn(provider) {
      return $q(function (resolve, reject) {
        $window.chrome.runtime.onMessage.addListener(function receiveMessage(res) {
          $window.chrome.runtime.onMessage.removeListener(receiveMessage);
          $window.chrome.app.window.current().focus();
          if (res) {
            return resolve(res);
          }
          return reject();
        });
        authProviders[provider].logIn();
      });
    }

    return {
      logIn: logIn,
      providers: authProviders
    };

  });


