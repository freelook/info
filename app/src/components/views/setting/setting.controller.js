'use strict';

angular
  .module('freelook.info')
  .controller('setting.ctrl',
  function (storage) {

    var vm = this;
    vm.notice = storage.get('notice', true);

    vm.toggleNotice = function () {
      storage.set('notice', vm.notice);
    };

  });

