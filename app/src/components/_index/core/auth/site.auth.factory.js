'use strict';
angular
  .module('freelook.info')
  .factory('authSite', function ($rootScope, $timeout, user, facebook, Parse) {

    function _setUser() {
      $timeout(function () {
        $rootScope.fli.user = user.current();
      });
    }

    function logIn(config) {
      if (user.current()) {
        $rootScope.fli.view = 'components/_index/setting/setting.view.html';
      } else {
        facebook.logIn(config);
      }
    }

    function logOut() {
      Parse.User.logOut().then(_setUser);
      $rootScope.fli.view = '';
    }

    return {
      logIn: logIn,
      logOut: logOut
    };

  });


