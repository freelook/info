'use strict';
angular
  .module('freelook.info')
  .factory('notice', function (notices, storage) {

    function pop() {
      if (storage.get('notice', true) && notices.length) {
        return notices.pop();
      }
    }

    function push(_notice) {
      notices.push(_notice);
    }

    return {
      push: push,
      pop: pop
    };

  })
;


