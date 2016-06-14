'use strict';

angular
  .module('fli.home')
  .controller('home.widget.subscription.ctrl',
  function (user, item) {

    var SUB_COUNT = 24,
      vm = this;

    vm.type = 'subscription';
    vm.limitTo = SUB_COUNT;
    vm.isLocal = user.params.isLocal;

    vm.href = function (_item) {
      return item.href({type: 'rss', sub: _item.rss});
    };

    vm.share = function (_item) {
      return item.share(vm.href(_item));
    };

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
      vm.limitTo += SUB_COUNT;
    };

    init();

  });
