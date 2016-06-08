'use strict';
angular
  .module('fli.core')
  .factory('user', function ($q, $rootScope, $cookies, $timeout, $http, userStorage, auth, USERS) {

    var BIND_PROVIDER = 'facebook';

    function init() {
      _getUser().then(function (user) {
        _showUser(user);
        return user;
      });
    }

    function data(provider) {
      var userData = userStorage.session.get('user') || {};
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
      var user = userStorage.session.get('user') || {};
      user[provider] = data;
      userStorage.session.put('user', user);
    }

    function logIn(provider) {
      return auth.logIn(provider)
        .then(function (token) {
          return _requestUser(provider, token);
        })
        .then(function (data) {
          _setUser(provider, data);
          return init();
        })
        .catch(function () {
          return logOut(provider);
        });
    }

    function logOut(provider) {
      _setUser(provider, null);
      init();
    }

    function bind() {
      return logIn(BIND_PROVIDER)
        .then(function () {
          var usr = data(BIND_PROVIDER);
          if (usr) {
            return USERS.post(usr).then(function (res) {
              userStorage.local.setNickName(res.data.nickname);
            });
          }
          return $q.reject();
        });
    }

    return {
      init: init,
      data: data,
      bind: bind,
      logIn: logIn,
      logOut: logOut,
      storage: userStorage
    };

  });


