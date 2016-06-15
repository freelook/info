'use strict';

angular
  .module('fli.home')
  .controller('home.widget.looks.ctrl',
  function (user) {

    var vm = this,
      LOOKS_COUNT = 24;

    vm.type = 'looks';
    vm.limitTo = LOOKS_COUNT;

    function _setItems(items) {
      vm.items = items || [];
    }

    function init() {
      user.feeds.get(vm.type).then(function (res) {
        _setItems(res.data);
      });
    }

    vm.clearItem = function (item) {
      user.feeds.clearItem(vm.type, item).then(function (res) {
        _setItems(res.data);
      });
    };

    vm.canEdit = function () {
      return user.params.isLocal() || user.params.isEmpty();
    };

    vm.more = function () {
      vm.limitTo += LOOKS_COUNT;
    };

    init();

  });

