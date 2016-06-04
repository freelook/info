'use strict';

angular
  .module('fli.home')
  .controller('home.widget.user.ctrl',
  function ($location, userLocalStorage, setting, nav) {

    var vm = this;

    vm.nickname = userLocalStorage.getNickName() || '';

    vm.setName = function () {
      vm.nickname = (vm.nickname || '').toLowerCase();
      userLocalStorage.setNickName(vm.nickname);
      nav.goHome();
    };

    vm.setting = function () {
      setting.open();
    };

    function _init() {
      if ('~/' + vm.nickname !== $location.path()) {
        nav.goHome();
      }
    }

    _init();

  });
