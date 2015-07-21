'use strict';

angular
  .module('fli.home')
  .controller('home.widget.looks.ctrl',
  function (local, url, LOOK_KEY) {

    var vm = this;
    vm.items = local.get(LOOK_KEY, []);

    vm.clearItem = function (item) {
      vm.items = local.arr.clearItem(LOOK_KEY, item);
    };

  });

