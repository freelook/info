'use strict';

angular
  .module('fli.home')
  .controller('home.widget.stars.ctrl',
  function (storage, url, STORAGE_KEYS) {

    var vm = this;
    vm.items = storage.get(STORAGE_KEYS.STAR_KEY, []);

    vm.clearItem = function (item) {
      vm.items = storage.arr.clearItem(STORAGE_KEYS.STAR_KEY, item);
    };

  });
