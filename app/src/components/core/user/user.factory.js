'use strict';
angular
  .module('fli.core')
  .factory('user', function ($q, $rootScope, $routeParams, $cookies, $timeout, $http,
                             storage, userStorage, auth, USERS) {

    var BIND_PROVIDER = 'facebook';

    function init() {
      var nickname = $routeParams.nickname || userStorage.local.getNickName(),
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
              sync(nickname);
            });
          }
          return $q.reject();
        });
    }

    function sync(nickname) {
      return USERS.syncData(nickname, {
        looks: storage.get(storage.keys.LOOK_KEY, '', {noParse: true}),
        stars: storage.get(storage.keys.STAR_KEY, '', {noParse: true}),
        subscription: storage.get(storage.keys.SUB_KEY, '', {noParse: true})
      })
        .then(function () {
          console.log('synced');
        });
    }

    function isLocal() {
      var localname = userStorage.local.getNickName();
      return localname && localname === $routeParams.nickname;
    }

    function isAnonymous() {
      return !userStorage.local.getNickName();
    }

    return {
      init: init,
      img: img,
      data: data,
      logIn: logIn,
      logOut: logOut,
      bind: bind,
      sync: sync,
      isLocal: isLocal,
      isAnonymous: isAnonymous,
      model: USERS,
      storage: userStorage
    };

  });


