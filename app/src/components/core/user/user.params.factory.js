'use strict';
angular
  .module('fli.core')
  .factory('userParams', function ($routeParams, userStorage) {


    function isLocal() {
      var localname = userStorage.local.getNickName();
      return localname && localname === routeNickName();
    }

    function isAnonymous() {
      return !userStorage.local.getNickName();
    }

    function routeNickName() {
      return $routeParams.nickname;
    }

    function localNickName() {
      return userStorage.local.getNickName();
    }

    return {
      isLocal: isLocal,
      isAnonymous: isAnonymous,
      routeNickName: routeNickName,
      localNickName: localNickName
    };

  });


