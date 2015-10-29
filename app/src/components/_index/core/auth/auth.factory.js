'use strict';
angular
  .module('freelook.info')
  .factory('auth', function (Parse) {

    function logIn() {
      Parse.FacebookUtils.logIn(null, {
        success: function (user) {
          if (!user.existed()) {
            console.log('User signed up and logged in through Facebook!');
          } else {
            console.log('User logged in through Facebook!');
          }
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


