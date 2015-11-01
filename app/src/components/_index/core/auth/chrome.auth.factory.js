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
      window.chrome.runtime.onMessage.addListener(function (req) {
        // todo parse req.token
        Parse.FacebookUtils.logIn({
          //id: '',
          //access_token: '',
          //expiration_date: ''
        }, {
          success: function () {
            _setUser(req);
          }
        });
      });
      url.link('https://www.facebook.com/dialog/oauth?client_id=' + CONFIG.FB.ID + '&redirect_uri=' + CONFIG.SITE.ORIGIN + 'token&response_type=token');
    }

    function logOut() {
      Parse.User.logOut().then(_setUser);
    }

    return {
      logIn: logIn,
      logOut: logOut
    };

  });


