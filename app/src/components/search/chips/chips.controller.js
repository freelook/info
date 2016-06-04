'use strict';

angular
  .module('fli.search')
  .controller('search.chips.ctrl',
  function (index) {

    var vm = this;
    vm.items = [];

    vm.remove = function (chip) {
      index.go(chip.route);
    };

  });
