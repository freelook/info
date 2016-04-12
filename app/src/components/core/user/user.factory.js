'use strict';
angular
  .module('freelook.info')
  .factory('user', function ($q, $rootScope, $cookies, $timeout, userStorage, auth) {


    function init() {
      _getUser().then(function (user) {
        _showUser(user);
        return user;
      });
    }

    function _showUser(user) {
      $timeout(function () {
        $rootScope.fli.user = user;
      });
    }

    function _getUser() {
      return $q.when(userStorage.get('user') || {});
    }

    function _requestUser(provider, token) {
      return auth.providers[provider].me(token);
    }

    function _setUser(provider, res) {
      var user = userStorage.get('user') || {};
      user[provider] = res ? res.data : null;
      userStorage.put('user', user);
    }

    function logIn(provider) {
      auth.logIn(provider)
        .then(function (token) {
          return _requestUser(provider, token);
        })
        .then(function (data) {
          _setUser(provider, data);
          init();
        });
    }

    function logOut(provider) {
      _setUser(provider, null);
      init();
    }

    return {
      init: init,
      logIn: logIn,
      logOut: logOut
    };

  });


