'use strict';

angular
  .module('freelook.info')
  .controller('input.notice.ctrl',
  function ($rootScope, $scope, notice, url) {

    var vm = this;
    vm.note = notice.pop() || '';

    vm.close = function () {
      vm.note = '';
    };

    vm.click = function () {
      if (vm.note) {
        if (vm.note.handler) {
          vm.note.handler();
        } else if (vm.note.link) {
          url.link(vm.note.link);
        }
        vm.close();
      }
    };

  });
