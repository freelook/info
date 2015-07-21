'use strict';
angular
  .module('freelook.info')
  .factory('local', function ($window) {

    function get(key, defaultValue) {
      var localStorageValue = $window.JSON.parse($window.localStorage.getItem(key));
      return !!localStorageValue ? localStorageValue : defaultValue || '';
    }

    function set(key, value) {
      try {
        $window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.log('Couldn\'t store ' + key + ' with value ' + value);
      }
    }

    //Array with obj methods

    function push(key, item, max) {
      var arr = get(key, []);
      if (!arr.some(function (el) {
          return angular.equals(item, el);
        })) {
        arr.unshift(item);
      }
      if (arr.length > max) {
        arr.pop();
      }
      set(key, arr);
      return arr;
    }

    function clearItem(key, item) {
      var arr = get(key, []),
        filtered = arr.filter(function (el) {
          return !angular.equals(item, el);
        });
      set(key, filtered);
      return filtered;
    }

    return {
      get: get,
      set: set,
      arr: {
        push: push,
        clearItem: clearItem
      }
    };

  });


