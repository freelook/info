'use strict';
angular
  .module('freelook.info')
  .factory('local', function ($window) {

    var localStorage = '';

    function CustomStorage() {
      this.data = {};
    }

    CustomStorage.prototype.getItem = function (key) {
      return this.data[key];
    };

    CustomStorage.prototype.setItem = function (key, value) {
      this.data[key] = value;
    };

    try {
      localStorage = $window.localStorage || new CustomStorage();
    } catch (e) {
      localStorage = new CustomStorage();
    }

    function get(key, defaultValue) {
      var localStorageValue = '';
      try {
        localStorageValue = $window.JSON.parse(localStorage.getItem(key));
      } catch (e) {
        console.log('Couldn\'t get ' + key);
      }

      return localStorageValue !== null ? localStorageValue : defaultValue || '';
    }

    function set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
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


