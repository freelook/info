'use strict';
angular
  .module('fli.core')
  .factory('userStorage', function (userLocalStorage, userSessionStorage) {

    return {
      local: userLocalStorage,
      session: userSessionStorage
    };

  });


