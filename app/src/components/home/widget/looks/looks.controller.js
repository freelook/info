'use strict';

angular
  .module('fli.home')
  .controller('home.widget.looks.ctrl',
  function (storage, url, LOOK_KEY) {

    var vm = this;
    vm.items = storage.get(LOOK_KEY, []);

    vm.clearItem = function (item) {
      vm.items = storage.arr.clearItem(LOOK_KEY, item);
    };

  });

