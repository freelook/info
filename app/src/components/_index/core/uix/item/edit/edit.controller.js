'use strict';

angular
  .module('freelook.info')
  .controller('item.edit.ctrl',
  function ($scope) {

    var vm = this;
    vm.imgEdit = false;
    vm.setImg = angular.noop;

    vm.imgToggle = function (_img) {
      vm.imgEdit = !vm.imgEdit;
      vm.setImg(_img);
    };

  });
