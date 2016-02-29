'use strict';

angular
  .module('freelook.info')
  .controller('auth.setting.ctrl',
  function (auth) {

    var vm = this;
    vm.logOut = auth.logOut;
    vm.logIn = auth.logIn;

  });
