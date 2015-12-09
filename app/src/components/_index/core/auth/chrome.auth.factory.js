'use strict';
angular
  .module('freelook.info')
  .factory('authChrome', function ($window, $rootScope, $timeout, $http, url, facebook, user, Parse, CONFIG) {

    function _setUser() {
      $timeout(function () {
        $rootScope.fli.user = user.current();
      });
    }

    function logIn() {
      if (user.current()) {
        $rootScope.fli.view = 'components/_index/setting/setting.view.html';
      } else {
        $window.chrome.runtime.onMessage.addListener(function (req) {
          Parse.FacebookUtils.logIn(req, {
            success: function () {
              _setUser(req);
              $window.chrome.app.window.current().focus();
            }
          });
        });
        url.link(CONFIG.SITE.ORIGIN + 'token/chrome');
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


