'use strict';

angular
  .module('fli.search')
  .controller('search.result.ctrl',
  function ($scope, item) {

    var vm = this;
    vm.href = item.href;
    vm.share = item.share;

  });

