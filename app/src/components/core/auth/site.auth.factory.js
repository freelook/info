'use strict';
angular
  .module('freelook.info')
  .factory('authSite', function ($q, $window, facebook) {

    var authProviders = {
      facebook: facebook
    };

    function logIn(provider) {
      return $q(function (resolve, reject) {
        var eventName = 'message', bubble = false;
        $window.addEventListener(eventName, function receiveMessage(res) {
          $window.removeEventListener(eventName, receiveMessage, bubble);
          $window.focus();
          if (res && res.data) {
            return resolve(res.data);
          }
          return reject();
        }, bubble);
        authProviders[provider].logIn();
      });
    }

    return {
      logIn: logIn,
      providers: authProviders
    };

  });


