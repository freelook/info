'use strict';

angular
  .module('fli.home')
  .controller('home.widget.looks.ctrl',
  function (user) {

    var vm = this;

    vm.type = 'looks';
    vm.isLocal = user.params.isLocal;

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

    init();

  });

