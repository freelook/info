'use strict';
angular
  .module('freelook.info')
  .factory('notice', function (notices, storage) {

    var counter;

    _init();

    function _init() {
      counter = 0;
    }

    function check() {
      if (storage.get('notice', true)) {
        counter++;
        if (counter === 7) {
          _init();
          return notices[0];
        }
      }
    }

    return {
      check: check
    };

  });


