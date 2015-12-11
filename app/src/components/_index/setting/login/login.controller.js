'use strict';

angular
  .module('freelook.info')
  .controller('login.setting.ctrl',
  function (auth) {

    var vm = this;
    vm.reset = auth.reset;

    vm.enabled = function () {
      return vm.email && vm.password;
    };

    vm.go = function () {
      auth.logIn({email: vm.email, password: vm.password});
    };

  });
