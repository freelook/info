'use strict';
angular
  .module('freelook.info')
  .factory('authSite', function (user, Firebase) {

    var authObj = Firebase.ref();

    authObj.onAuth(function () {
      user.init();
    });

    function _storeAuthData(authData) {
      Firebase.ref('users').child(authData.uid).child('authData').set(authData);
    }

    function logIn(provider) {
      return authObj.authWithOAuthPopup(provider).then(function (authData) {
        _storeAuthData(authData);
      });
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


