'use strict';
angular
  .module('freelook.info')
  .factory('storage', function($window, localStorage, customStorage, STORAGE_KEYS) {

    var storage;

    try {
      storage = localStorage || customStorage;
    } catch (e) {
      storage = customStorage;
    }

    function get(key, defaultValue, _options) {
      var storageValue = storage.getItem(key) || null,
        options = _options || {};
      try {
        if (storageValue && !options.noParse) {
          storageValue = $window.JSON.parse(storageValue);
        }
      } catch (e) {
        console.log('Couldn\'t get ' + key);
      }

      return storageValue !== null ? storageValue : defaultValue || '';
    }

    function set(key, value, parser) {
      try {
        storage.setItem(key, JSON.stringify(value, parser));
      } catch (e) {
        console.log('Couldn\'t store ' + key + ' with value ' + value);
      }
    }

    function push(key, item, max, parser) {
      var arr = get(key, []);
      if (!arr.some(function(el) {
          return angular.equals(item.url, el.url);
        })) {
        arr.push(item);
        if (max && arr.length > max) {
          arr.shift();
        }
        set(key, arr, parser);
        return true;
      }
      return false;
    }

    function clearItem(key, item) {
      var arr = get(key, []),
        filtered = arr.filter(function(el) {
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
      },
      parser: {
        func: function(key, val) {
          return typeof val === 'function' ? '' + val : val;
        }
      }
    };

  })
  .constant('STORAGE_KEYS', {
    LOOK_KEY: 'FLI:LOOK',
    STAR_KEY: 'FLI:STAR',
    SUB_KEY: 'FLI:SUB',
    USR_KEY: 'FLI:USR',
    FEEDS_TIMESTAMP_KEY: 'FLI:FEEDS_TIMESTAMP_KEY',

    KICKSTARTER_PROMO_VISIBILITY_KEY: 'KICKSTARTER_PROMO_VISIBILITY_KEY'
  });


