'use strict';

angular
  .module('freelook.info')
  .controller('share.ctrl',
  function ($scope, share, item) {

    var vm = this;
    vm.href = item.href;
    vm.item = share.item();
    vm.run = share.run;
    vm.close = function () {
      $scope.fli.view = '';
    };
  });

