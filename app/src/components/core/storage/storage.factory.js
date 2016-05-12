'use strict';
angular
  .module('freelook.info')
  .factory('storage', function ($window, localStorage, customStorage, STORAGE_KEYS) {

    var storage;

    try {
      storage = localStorage || customStorage;
    } catch (e) {
      storage = customStorage;
    }

    function get(key, defaultValue) {
      var storageValue = storage.getItem(key) || null;
      try {
        if (storageValue) {
          storageValue = $window.JSON.parse(storageValue);
        }
      } catch (e) {
        console.log('Couldn\'t get ' + key);
      }

      return storageValue !== null ? storageValue : defaultValue || '';
    }

    function set(key, value) {
      try {
        storage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.log('Couldn\'t store ' + key + ' with value ' + value);
      }
    }

    function push(key, item, max) {
      var arr = get(key, []);
      if (!arr.some(function (el) {
          return angular.equals(item.url, el.url);
        })) {
        arr.push(item);
        if (max && arr.length > max) {
          arr.shift();
        }
        set(key, arr);
        return true;
      }
      return false;
    }

    function clearItem(key, item) {
      var arr = get(key, []),
        filtered = arr.filter(function (el) {
          return !angular.equals(item.url, el.url);
        });
      set(key, filtered);
      return filtered;
    }

    return {
      get: get,
      set: set,
      keys: STORAGE_KEYS,
      arr: {
        push: push,
        clearItem: clearItem
      }
    };

  })
  .constant('STORAGE_KEYS', {
    LOOK_KEY: 'FLI:LOOK',
    STAR_KEY: 'FLI:STAR',
    SUB_KEY: 'FLI:SUB',
    USR_KEY: 'FLI:USR'
  });


