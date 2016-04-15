'use strict';

angular
  .module('fli.uix')
  .controller('version.ctrl',
  function (CONFIG) {

    var vm = this;
    vm.number = CONFIG.VERSION;
    vm.repo = 'https://github.com/freelook/';

  });

