'use strict';
angular
  .module('fli.views')
  .factory('setting', function ($rootScope, user) {

    function _setting() {
      $rootScope.fli.view = 'components/views/setting/setting.view.html';
    }

    function open() {
      if (user.storage.local.getNickName()) {
        return _setting();
      }
      return user.bind().then(_setting);
    }

    function close() {
      $rootScope.fli.view = '';
    }

    return {
      open: open,
      close: close
    };

  });


