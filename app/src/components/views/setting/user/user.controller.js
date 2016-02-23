'use strict';

angular
  .module('freelook.info')
  .controller('user.setting.ctrl',
  function (auth) {

    var vm = this;
    vm.logOut = auth.logOut;

  });
