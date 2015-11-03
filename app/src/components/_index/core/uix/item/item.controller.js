'use strict';

angular
  .module('freelook.info')
  .controller('item.ctrl',
  function ($rootScope) {

    var vm = this;
    vm.fix = $rootScope.fli.fix;

  });
