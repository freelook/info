'use strict';

angular
  .module('fli.token')
  .controller('token.ctrl',
  function ($timeout, $location, $routeParams, url, user, token, FB, LINKS, Parse) {

    var _token = $location.absUrl().split('#')[1] || 'error=1',
      tokenQuery = '?' + _token,
      authTokenData = url.qToObj(tokenQuery);


    function _getUser(fb) {
      fb.api('/me', {access_token: authTokenData.access_token}, function (me) {
        var authData = {
          access_token: authTokenData.access_token,
          expiration_date: new Date(authTokenData.expires_in * 1000 + (new Date()).getTime()).toJSON(),
          id: me.id
        };
        Parse.FacebookUtils.logIn(authData, {
          success: function () {
            user.current().set('username', me.name).save();
            _goHome();
          }
        });
      });
    }

    function _goHome() {
      if ($routeParams.chrome) {
        token.sendToChrome(user.current());
      } else {
        user.init();
        $timeout(function () {
          $location.path(LINKS.HOME).hash('').replace();
        });
      }
    }

    if (authTokenData.access_token) {
      FB.init().then(_getUser);
    } else {
      _goHome();
    }


  });

