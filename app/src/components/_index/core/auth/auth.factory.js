'use strict';
angular
  .module('freelook.info')
  .factory('auth', function ($rootScope, $timeout, toast, user, Parse) {

    function _setUser() {
      $timeout(function () {
        $rootScope.fli.user = user.current();
      });
    }

    function logIn(usr) {
      var User = new Parse.Query(Parse.User);
      User
        .equalTo('email', usr.email)
        .first()
        .then(function (_usr) {
          if (_usr) {
            Parse.User.logIn(usr.email, usr.password).then(_setUser);
          } else {
            var newUser = new Parse.User();
            newUser.set('email', usr.email);
            newUser.set('username', usr.email);
            newUser.set('password', usr.password);
            newUser.signUp().then(_setUser);
          }
        });
    }

    function logOut() {
      Parse.User.logOut().then(_setUser);
    }

    function reset(email) {
      Parse.User.requestPasswordReset(email).then(function () {
        toast.show('index.core.uix.setting.login.resetToast');
      });
    }

    return {
      logIn: logIn,
      logOut: logOut,
      reset: reset
    };

  });


