'use strict';

angular
  .module('fli.home')
  .controller('home.widget.ctrl',
    function ($routeParams, url, item, nav, feeds) {

      var vm = this;

      vm.search = item.search;
      vm.href = item.href;
      vm.share = item.share;
      vm.types = feeds.types;
      vm.icons = feeds.icons;

      function _init() {
        vm.type = $routeParams.type;
      }

      vm.setType = function (type) {
        nav.go({type: type});
      };

      vm.typeHref = function (type) {
        return url.href(null, {l: $routeParams.l, type: type}, false, '/');
      };

      vm.isProfile = nav.isProfile();

      _init();

    });

