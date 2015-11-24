'use strict';

angular
  .module('freelook.info')
  .controller('item.edit.ctrl',
  function () {

    var vm = this;
    vm.imgEdit = false;

    vm.imgToggle = function () {
      vm.imgEdit = !vm.imgEdit;
    };

  });
