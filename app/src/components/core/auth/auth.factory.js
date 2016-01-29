'use strict';
angular
  .module('freelook.info')
  .factory('auth', function ($rootScope, $timeout, toast, user, Firebase) {

    var authObj = Firebase.authObj();

    authObj.$onAuth(function () {
      $timeout(function () {
        $rootScope.fli.user = user.current();
      });
    });

    function logIn(usr) {
      authObj.$createUser({
        email: usr.email,
        password: usr.password
      }).finally(function () {
        authObj.$authWithPassword({
          email: usr.email,
          password: usr.password
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


