'use strict';
angular
  .module('freelook.info')
  .factory('notice', function ($rootScope, notices, local) {

    var notice, counter;

    _init();

    function _init() {
      counter = 0;
      notice = '';
    }

    function check() {
      if (!local.get('notice', true)) {
        _init();
        return notice;
      }

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


