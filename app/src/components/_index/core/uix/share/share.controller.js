'use strict';

angular
  .module('freelook.info')
  .controller('share.ctrl',
  function ($scope, share, result) {

    var vm = this;
    vm.href = result.href;
    vm.item = share.item();
    vm.run = share.run;
    vm.close = function () {
      $scope.fli.view = '';
    };
  });

