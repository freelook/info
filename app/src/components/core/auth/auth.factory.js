'use strict';
angular
  .module('freelook.info')
  .factory('auth', function (toast, user, Firebase) {

    var authObj = Firebase.authObj();

    authObj.$onAuth(user.init);

    function logIn(usr) {
      authObj.$createUser({
        email: usr.email,
        password: usr.password
      })
        .then(function () {
          authObj.isNewUser = true;
        })
        .finally(function () {
          authObj.$authWithPassword({
            email: usr.email,
            password: usr.password
          })
            .then(function () {
              if (authObj.isNewUser) {
                var authData = user.authData();
                Firebase.ref('users').child(authData.uid).set({
                  email: authData.password.email
                });
              }
            });
        });
    }

    function logOut() {
      authObj.$unauth();
    }

    function reset(email) {
      authObj.$resetPassword({email: email}).then(function () {
        toast.show('index.core.uix.setting.login.resetToast');
      });
    }

    return {
      logIn: logIn,
      logOut: logOut,
      reset: reset
    };

  });


