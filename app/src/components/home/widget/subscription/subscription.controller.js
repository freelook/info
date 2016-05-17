'use strict';

angular
  .module('fli.home')
  .controller('home.widget.subscription.ctrl',
  function (storage, url, item, STORAGE_KEYS) {

    var SUB_COUNT = 24,
      vm = this;

    vm.limitTo = SUB_COUNT;
    vm.items = storage.get(STORAGE_KEYS.SUB_KEY, []);

    vm.href = function (_item) {
      return item.href({type: 'rss', sub: _item.rss});
    };

    vm.share = function (_item) {
      return item.share(vm.href(_item));
    };

    vm.more = function () {
      vm.limitTo += SUB_COUNT;
    };

    vm.clearItem = function (_item) {
      vm.items = storage.arr.clearItem(STORAGE_KEYS.SUB_KEY, _item);
    };

  });
