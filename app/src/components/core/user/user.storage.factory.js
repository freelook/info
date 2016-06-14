'use strict';
angular
  .module('fli.core')
  .factory('userStorage', function ($q, storage, userLocalStorage, userSessionStorage) {

    return {
      local: userLocalStorage,
      session: userSessionStorage
    };

  });


