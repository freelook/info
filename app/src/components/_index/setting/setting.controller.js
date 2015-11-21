'use strict';

angular
  .module('freelook.info')
  .controller('setting.ctrl',
  function ($scope, storage, auth, user, facebook) {

    var vm = this;

    function _init() {
      user.init();
    }

    vm.notice = storage.get('notice', true);
    vm.logOut = auth.logOut;
    vm.fbImg = facebook.img;

    vm.close = function () {
      $scope.fli.view = '';
    };

    vm.toggleNotice = function () {
      storage.set('notice', vm.notice);
    };


    _init();

  });

