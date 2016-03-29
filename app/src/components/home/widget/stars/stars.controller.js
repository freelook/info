'use strict';

angular
  .module('fli.home')
  .controller('home.widget.stars.ctrl',
  function (storage, url, STORAGE_KEYS) {

    var STARS_COUNT = 24,
      vm = this;

    vm.limitTo = STARS_COUNT;
    vm.items = storage.get(STORAGE_KEYS.STAR_KEY, []);

    vm.more = function () {
      vm.limitTo += STARS_COUNT;
    };

    vm.clearItem = function (item) {
      vm.items = storage.arr.clearItem(STORAGE_KEYS.STAR_KEY, item);
    };

  });
