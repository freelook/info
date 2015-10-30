'use strict';
angular
  .module('freelook.info')
  .factory('auth', function ($rootScope, $timeout, user, Parse) {

    function _setUser() {
      $timeout(function () {
        $rootScope.fli.user = user.current();
      });
    }

    function logIn() {
      if (!user.current()) {
        Parse.FacebookUtils.logIn(null, {
          success: function () {
            _setUser();
          }
        });
      }
    }

    function logOut() {
      Parse.User.logOut().then(_setUser);
    }

    return {
      logIn: logIn,
      logOut: logOut
    };

  });


