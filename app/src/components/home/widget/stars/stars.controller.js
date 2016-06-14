'use strict';

angular
  .module('fli.home')
  .controller('home.widget.stars.ctrl',
  function (user) {

    var STARS_COUNT = 24,
      vm = this;

    vm.type = 'stars';
    vm.limitTo = STARS_COUNT;
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

    vm.more = function () {
      vm.limitTo += STARS_COUNT;
    };

    init();

  });
