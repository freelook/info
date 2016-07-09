'use strict';

angular
  .module('fli.home')
  .controller('home.widget.ctrl',
  function (url, item, nav, feeds) {

    var vm = this,
      DEFAULT_WIDGET_TYPE = 'looks';

    vm.search = item.search;
    vm.href = item.href;
    vm.share = item.share;
    vm.types = feeds.types;
    vm.icons = feeds.icons;

    function _init() {
      vm.type = nav.hash() || DEFAULT_WIDGET_TYPE;
    }

    vm.setType = function (type) {
      nav.hash(type);
    };

    vm.typeHref = function (type) {
      return nav.hashChange(type);
    };

    vm.isProfile = nav.isProfile();

    _init();

  });

