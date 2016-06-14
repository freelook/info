'use strict';
angular
  .module('fli.core')
  .factory('user', function ($q, $rootScope, $cookies, $timeout,
                             auth, userStorage, userFeeds, userParams, USERS) {

    var BIND_PROVIDER = 'facebook';

    function init() {
      var nickname = userParams.routeNickName() || userParams.localNickName(),
        user = data();
      user.data = null;
      if (nickname) {
        USERS.one(nickname)
          .then(function (res) {
            user.data = res.data;
          })
          .finally(function () {
            _showUser(user);
          });
      } else {
        _showUser(user);
      }
    }

    function img(id) {
      return auth.providers[BIND_PROVIDER].img(id);
    }

    function data(provider) {
      var userData = userStorage.session.get('user') || {};
      return !!provider ? userData[provider] : userData;
    }

    function _showUser(user) {
      $timeout(function () {
        $rootScope.fli.user = user;
      });
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
            return USERS.create(usr).then(function (res) {
              var nickname = res.data.nickname;
              userStorage.local.setNickName(nickname);
              userFeeds.sync(nickname);
            });
          }
          return $q.reject();
        });
    }

    return {
      init: init,
      img: img,
      data: data,
      logIn: logIn,
      logOut: logOut,
      bind: bind,

      model: USERS,
      feeds: userFeeds,
      storage: userStorage,
      params: userParams
    };

  });


