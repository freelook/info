'use strict';
angular
  .module('freelook.info')
  .factory('notice', function ($rootScope, notices) {

    var notice, counter;

    _init();

    function _init() {
      counter = 0;
      notice = '';
    }

    function check() {
      var _notice = notice;
      if (_notice) {
        _init();
      }
      return _notice;
    }

    $rootScope.$on('$routeChangeSuccess', function () {
      counter++;
      if (counter === 5) {
        notice = notices[0];
      }
    });

    return {
      check: check
    };

  });


