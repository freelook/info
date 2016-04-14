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

    function data(provider) {
      var userData = userStorage.get('user') || {};
      return provider ? userData[provider] : userData;
    }

    function _showUser(user) {
      $timeout(function () {
        $rootScope.fli.user = user;
      });
    }

    function _getUser() {
      return $q.when(data());
    }

    function _requestUser(provider, token) {
      return auth.providers[provider]
        .me(token)
        .then(function (res) {
          res.data.token = token;
          return res.data;
        });
    }

    function _setUser(provider, data) {
      var user = userStorage.get('user') || {};
      user[provider] = data;
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
        })
        .catch(function () {
          logOut(provider);
        });
    }

    function logOut(provider) {
      _setUser(provider, null);
      init();
    }

    return {
      init: init,
      data: data,
      logIn: logIn,
      logOut: logOut
    };

  });


