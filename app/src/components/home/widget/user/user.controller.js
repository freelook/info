'use strict';

angular
  .module('fli.home')
  .controller('home.widget.user.ctrl',
  function (storage, setting) {

    var vm = this;

    vm.nickname = (storage.get(storage.keys.USR_KEY, {}) || {}).nickname || '';

    vm.setName = function () {
      storage.set(storage.keys.USR_KEY, {nickname: vm.nickname});
    };

    vm.setting = function () {
      setting.open();
    };

  });
