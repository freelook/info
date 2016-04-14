'use strict';
angular
  .module('freelook.info')
  .factory('userStorage', function (storage, CacheFactory) {

    return CacheFactory(storage.keys.USR_KEY, {
      maxAge: 3 * 60 * 60 * 1000,
      deleteOnExpire: 'aggressive',
      storageMode: 'sessionStorage'
    });

  });


