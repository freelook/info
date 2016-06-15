'use strict';

angular
  .module('fli.home')
  .controller('home.widget.user.ctrl',
  function (user, setting, nav) {

    var vm = this;

    vm.logIn = user.logIn;
    vm.isLocal = user.params.isLocal;
    vm.routename = user.params.routeNickName();
    vm.localname = user.params.localNickName();
    vm.clear = user.clear;

    vm.setting = function () {
      setting.open();
    };

    vm.isSetting = function () {
      return !(vm.localname || vm.routename);
    };

    function _init() {
      if (!(vm.routename && ~nav.path().indexOf('~/'))) {
        return nav.goHome(null, nav.hash());
      }
    }

    _init();

  });
