'use strict';
angular
  .module('freelook.info')
  .factory('chromeStorage', function ($window, $q) {

    function getItem(key) {
      var defer = $q.defer();
      $window.chrome.storage.local.get(key, function (value) {
        return defer.resolve(value || null);
      });

      return defer.promise;
    }


    function setItem(key, value) {
      var item = {};
      item[key] = value;
      $window.chrome.storage.local.set(item);
    }

    return {
      getItem: getItem,
      setItem: setItem
    };

  });


