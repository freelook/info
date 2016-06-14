'use strict';

angular
  .module('fli.home')
  .controller('home.widget.ctrl',
  function (url, item, nav) {

    var vm = this,
      DEFAULT_WIDGET_TYPE = 'looks';

    vm.search = item.search;
    vm.href = item.href;
    vm.share = item.share;

    function _init() {
      vm.type = nav.hash() || DEFAULT_WIDGET_TYPE;
    }

    vm.setType = function (type) {
      nav.hash(type);
    };

    _init();

  });

