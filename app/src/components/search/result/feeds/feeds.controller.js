'use strict';

angular
  .module('fli.search')
  .controller('search.result.feeds.ctrl',
  function ($timeout, $routeParams, item, feeds, nav, url, locale, user) {

    var vm = this,
      LIMIT = 24,
      ORDERS = {
        popular: 'count'
      };

    vm.img = user.img;
    vm.userHref = user.href;
    vm.href = item.href;
    vm.share = item.share;
    vm.search = item.search;

    vm.page = +$routeParams.p || null;
    vm.order = $routeParams.order || null;
    vm.orderBy = ORDERS[vm.order] || null;

    vm.more = function () {
      nav.go({p: ++vm.page});
    };

    vm.back = function () {
      nav.go({p: --vm.page || null});
    };

    vm.orderHref = function (order) {
      return url.href(null, {l: $routeParams.l, order: order}, false, '/');
    };

    vm.pageHref = function (page) {
      return url.href(null, {l: $routeParams.l, order: $routeParams.order, p: page}, false, '/');
    };

    function load() {
      feeds.query($routeParams, vm.page, vm.order)
        .success(function (results) {
          vm.results = results.rows;
          vm.count = Math.ceil(results.count / LIMIT) - 1;
        });
    }

    load();

  })
;

