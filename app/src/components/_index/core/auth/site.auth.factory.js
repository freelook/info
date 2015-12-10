'use strict';
angular
  .module('freelook.info')
  .factory('authSite', function ($rootScope, $timeout, user, facebook, Parse) {

    function _setUser() {
      $timeout(function () {
        $rootScope.fli.user = user.current();
      });
    }

    function logIn() {
      $rootScope.fli.view = 'components/_index/setting/setting.view.html';
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


