'use strict';

angular
  .module('freelook.info')
  .controller('item.ctrl',
  function (index, item) {

    var vm = this;
    vm.fix = index.fix;
    vm.star = item.star;

  });
