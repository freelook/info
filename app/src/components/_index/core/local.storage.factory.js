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

    function push(key, value, max) {
      var arr = get(key, []);
      if (!arr.some(function (el) {
          return angular.equals(value, el);
        })) {
        arr.unshift(value);
      }
      if (arr.length > max) {
        arr.pop();
      }
      set(key, arr);
    }

    return {
      get: get,
      set: set,
      push: push
    };

  });


