'use strict';

angular
  .module('fli.home')
  .controller('home.widget.user.ctrl',
  function ($routeParams, $location, user, setting, nav) {

    var vm = this;

    vm.logIn = user.logIn;
    vm.isLocal = user.isLocal;
    vm.nickname = $routeParams.nickname;
    vm.localname = user.storage.local.getNickName();

    vm.logOut = function () {
      user.storage.local.set(null);
      nav.goHome();
    };

    vm.setting = function () {
      setting.open();
    };

    vm.isSetting = function () {
      return !(vm.localname || vm.nickname);
    };

    function _init() {
      if (!($routeParams.nickname && ~$location.path().indexOf('~/'))) {
        return nav.goHome();
      }
    }

    _init();

  });
