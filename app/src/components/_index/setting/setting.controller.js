'use strict';

angular
  .module('freelook.info')
  .controller('setting.ctrl',
  function ($scope, storage, auth, facebook) {

    var vm = this;

    vm.notice = storage.get('notice', true);
    vm.logOut = auth.logOut;
    vm.fbImg = facebook.img;

    vm.close = function () {
      $scope.fli.view = '';
    };

    vm.toggleNotice = function () {
      storage.set('notice', vm.notice);
    };


  });

