'use strict';
angular
  .module('freelook.info')
  .factory('auth', function (setting, toast, user, Firebase) {

    var authObj = Firebase.ref();

    authObj.onAuth(function (auth) {
      user.init(auth);
    });

    function _storeUser(authData) {
      var userRef = Firebase.ref('users').child(authData.uid);
      return userRef.once('value').then(function () {
        return userRef.set(authData);
      });
    }

    function logOut() {
      authObj.unauth();
      setting.close();
    }

    function logIn() {
      if (user.authData()) {
        setting.open();
      } else {
        authObj.authWithOAuthPopup('facebook').then(function (authData) {
          _storeUser(authData);
          setting.open();
        });
      }
    }

    return {
      logIn: logIn,
      logOut: logOut
    };

  });


