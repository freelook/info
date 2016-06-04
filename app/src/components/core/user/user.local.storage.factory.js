'use strict';
angular
  .module('fli.core')
  .factory('userLocalStorage', function (storage) {

    function get() {
      return storage.get(storage.keys.USR_KEY, {}) || {};
    }

    function set(usr) {
      storage.set(storage.keys.USR_KEY, usr || {});
    }

    function getNickName() {
      var usr = get();
      return usr.nickname;
    }

    function setNickName(nickname) {
      var usr = get();
      usr.nickname = (nickname || '').toLowerCase();
      set(usr);
    }

    return {
      get: get,
      set: set,
      getNickName: getNickName,
      setNickName: setNickName
    };

  });


