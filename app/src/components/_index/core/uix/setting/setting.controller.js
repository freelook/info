'use strict';

angular
  .module('freelook.info')
  .controller('setting.ctrl',
  function ($scope, local) {

    var vm = this;

    vm.notice = local.get('notice', true);

    vm.close = function () {
      $scope.fli.view = '';
    };

    vm.toggleNotice = function () {
      local.set('notice', vm.notice);
    };

  });

