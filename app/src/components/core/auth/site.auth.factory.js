'use strict';
angular
  .module('freelook.info')
  .factory('authSite', function (user, toast, Firebase) {

    var authObj = Firebase.ref();

    authObj.onAuth(function () {
      user.init();
    });

    function _storeAuthData(authData) {
      Firebase.ref('users').child(authData.uid).child('authData').set(authData);
    }

    function logIn(provider) {
      return authObj.authWithOAuthPopup(provider)
        .then(function (authData) {
          _storeAuthData(authData);
        })
        .catch(function (err) {
          if (err && err.code === 'TRANSPORT_UNAVAILABLE') {
            toast.show('core.auth.unavailable');
          }
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


