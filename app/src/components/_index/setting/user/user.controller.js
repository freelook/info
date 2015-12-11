'use strict';

angular
  .module('freelook.info')
  .controller('user.setting.ctrl',
  function (auth, user) {

    var vm = this;
    vm.logOut = auth.logOut;

    user.init();

  });
