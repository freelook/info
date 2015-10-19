'use strict';
angular
  .module('freelook.info')
  .factory('customStorage', function (platform, chromeStorage) {

    var data = {}, sync = false;

    _sync();

    function _sync(value) {
      if (platform.name() === 'chrome') {
        if (!value) {
          chromeStorage.getItem('data')
            .then(function (_storage) {
              if (_storage && _storage.data) {
                angular.extend(data, _storage.data);
                sync = true;
              }
            });
        } else {
          if (sync) {
            chromeStorage.setItem('data', value);
          }
        }
      }
    }

    function getItem(key) {
      return data[key] || null;
    }

    function setItem(key, value) {
      data[key] = value;
      _sync(data);
    }

    return {
      getItem: getItem,
      setItem: setItem
    };

  });


