'use strict';

angular
  .module('fli.search')
  .controller('search.result.feeds.ctrl',
    function ($timeout, $routeParams, item, feeds, nav, url, locale, user) {

      var vm = this,
        LIMIT = 24;

      vm.img = user.img;
      vm.userHref = user.href;
      vm.href = item.href;
      vm.share = item.share;
      vm.search = item.search;

      vm.page = +$routeParams.p || null;

      vm.pageHref = function (page) {
        return url.href(null, {l: $routeParams.l, p: page}, false, '/');
      };

      vm.more = function () {
        nav.go({p: ++vm.page});
      };

      vm.back = function () {
        nav.go({p: --vm.page || null});
      };

      function load() {
        feeds.query($routeParams, vm.page)
          .success(function (results) {
            vm.results = results.rows;
            vm.count = Math.ceil(results.count / LIMIT) - 1;
          });
      }

      load();

    });

