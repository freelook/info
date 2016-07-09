'use strict';
angular
  .module('fli.core')
  .factory('userParams', function ($routeParams, userStorage) {


    function isLocal() {
      return localNickName() === routeNickName();
    }

    function isAnonymous() {
      return !userStorage.local.getNickName();
    }

    function isEmpty() {
      return isAnonymous() && !routeNickName();
    }

    function routeNickName() {
      return $routeParams.nickname || '';
    }

    function localNickName() {
      return userStorage.local.getNickName();
    }

    return {
      isLocal: isLocal,
      isAnonymous: isAnonymous,
      isEmpty: isEmpty,
      routeNickName: routeNickName,
      localNickName: localNickName
    };

  });


