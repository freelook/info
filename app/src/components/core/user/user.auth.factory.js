'use strict';
angular
  .module('fli.core')
  .factory('userAuth', function ($q, $timeout, $rootScope,
                                 auth, http, nav, userStorage, userFeeds, userParams, USERS, BIND_PROVIDER) {

    function data(provider) {
      var userData = userStorage.session.get('user') || {};
      return !!provider ? userData[provider] : userData;
    }

    function request(provider, token) {
      return auth.providers[provider]
        .me(token)
        .then(function (res) {
          res.data.token = token;
          return res.data;
        });
    }

    function put(provider, data) {
      var user = userStorage.session.get('user') || {};
      user[provider] = data;
      userStorage.session.put('user', user);
    }

    function img(id) {
      return auth.providers[BIND_PROVIDER].img(id);
    }

    function logIn(provider) {
      return auth.logIn(provider)
        .then(function (token) {
          return request(provider, token);
        })
        .then(function (data) {
          put(provider, data);
          return init();
        })
        .catch(function () {
          return logOut(provider);
        });
    }

    function logOut(provider) {
      put(provider, null);
      init();
    }

    function init() {
      var nickname = userParams.routeNickName() || userParams.localNickName(),
        user = data();
      user.data = null;
      if (nickname) {
        USERS.one(nickname, userParams.isLocal() ? {local: 1} : null)
          .then(function (res) {
            user.data = res.data;
          })
          .catch(function (res) {
            if (userParams.isLocal() && http.is404(res.status)) {
              clear();
            }
          })
          .finally(function () {
            show(user);
          });
      } else {
        show(user);
      }
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

    function clear() {
      userStorage.local.set(null);
      nav.goHome();
    }

    function show(user) {
      $timeout(function () {
        $rootScope.fli.user = user;
      });
    }

    return {
      data: data,
      request: request,
      put: put,
      img: img,
      logIn: logIn,
      logOut: logOut,

      init: init,
      bind: bind,
      clear: clear,
      show: show,

      BIND_PROVIDER: BIND_PROVIDER
    };

  })
  .constant('BIND_PROVIDER', 'facebook');


