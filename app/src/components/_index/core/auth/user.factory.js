'use strict';
angular
  .module('freelook.info')
  .factory('user', function (Parse) {

    function current() {
      return Parse.User.current();
    }

    return {
      current: current
    };

  });


