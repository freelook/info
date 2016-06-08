'use strict';

angular
  .module('fli.home')
  .controller('home.widget.user.ctrl',
  function ($location, user, setting, nav) {

    var vm = this;

    vm.logIn = user.logIn;
    vm.nickname = user.storage.local.getNickName() || '';

    vm.logOut = function () {
      user.storage.local.set(null);
      nav.goHome();
    };

    vm.setting = function () {
      setting.open();
    };

    function _init() {
      if (!~$location.path().indexOf('~/')) {
        nav.goHome();
      }
    }

    _init();

  });
