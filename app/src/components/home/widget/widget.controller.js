'use strict';

angular
  .module('fli.home')
  .controller('home.widget.ctrl',
  function (url, item) {

    var vm = this;
    vm.type = 'looks';
    vm.search = item.search;
    vm.href = item.href;
    vm.share = item.share;

  });

