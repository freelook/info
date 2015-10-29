'use strict';
angular
  .module('freelook.info')
  .factory('auth', function ($rootScope, $timeout, user, Parse) {

    function logIn() {
      Parse.FacebookUtils.logIn(null, {
        success: function () {
          $timeout(function () {
            $rootScope.fli.user = user.current();
          });
          console.log('User signed up and logged in through Facebook!');
        },
        error: function () {
          console.log('User cancelled the Facebook login or did not fully authorize.');
        }
      });
    }

    return {
      logIn: logIn
    };

  });


