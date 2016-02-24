'use strict';
angular
  .module('freelook.info')
  .factory('auth', function (setting, toast, user, Firebase) {

    var authObj = Firebase.ref();

    authObj.onAuth(function () {
      user.init();
    });

    function _storeAuthData(authData) {
      Firebase.ref('users').child(authData.uid).child('authData').set(authData);
    }

    function logOut() {
      authObj.unauth();
      setting.close();
    }

    function logIn() {
      if (user.authData().uid) {
        setting.open();
      } else {
        authObj.authWithOAuthPopup('facebook').then(function (authData) {
          _storeAuthData(authData);
          setting.open();
        });
      }
    }

    return {
      logIn: logIn,
      logOut: logOut
    };

  });


