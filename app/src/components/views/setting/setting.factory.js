'use strict';
angular
  .module('fli.views')
  .factory('setting', function ($rootScope) {

    function open() {
      $rootScope.fli.view = 'components/views/setting/setting.view.html';
    }

    function close() {
      $rootScope.fli.view = '';
    }

    return {
      open: open,
      close: close
    };

  });


