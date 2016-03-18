'use strict';

angular
  .module('fli.look')
  .factory('look', function (item, storage, STORAGE_KEYS) {

    function add(_item) {
      if (_item && _item.url && _item.img) {
        storage.arr.push(STORAGE_KEYS.LOOK_KEY, item.config(_item), 36);
      }
    }

    return {
      add: add
    };

  });
