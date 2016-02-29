'use strict';
angular
  .module('freelook.info')
  .factory('auth', function (toast, user, Firebase) {

    var authObj = Firebase.ref();

    authObj.onAuth(function () {
      user.init();
    });

    function _storeAuthData(authData) {
      Firebase.ref('users').child(authData.uid).child('authData').set(authData);
    }

    function logOut() {
      authObj.unauth();
    }

    function logIn(provider) {
      authObj.authWithOAuthPopup(provider).then(function (authData) {
        _storeAuthData(authData);
      });
    }

    return {
      logIn: logIn,
      logOut: logOut,
      data: user.authData
    };

  });


