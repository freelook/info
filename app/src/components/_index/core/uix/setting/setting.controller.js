'use strict';

angular
  .module('freelook.info')
  .controller('setting.ctrl',
  function ($scope, storage, auth) {

    var vm = this;

    vm.notice = storage.get('notice', true);
    vm.logIn = auth.logIn;

    vm.close = function () {
      $scope.fli.view = '';
    };

    vm.toggleNotice = function () {
      storage.set('notice', vm.notice);
    };

  });

