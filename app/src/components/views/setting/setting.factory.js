'use strict';
angular
  .module('fli.views')
  .factory('setting', function ($rootScope, user) {

    var SETTING_VIEW_URL = 'components/views/setting/setting.view.html';

    function _setting() {
      $rootScope.fli.view = SETTING_VIEW_URL;
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

    function isOpen() {
      return $rootScope.fli.view === SETTING_VIEW_URL;
    }

    return {
      open: open,
      close: close,
      isOpen: isOpen
    };

  });


