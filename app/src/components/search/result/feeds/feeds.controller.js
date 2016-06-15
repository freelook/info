'use strict';

angular
  .module('fli.search')
  .controller('search.result.feeds.ctrl',
  function ($timeout, $scope, feeds, nav, user) {

    var vm = this,
      LIMIT = 24;

    vm.img = user.img;
    vm.href = user.href;

    vm.page = +nav.hash() || 0;

    vm.pageHref = function (page) {
      return nav.hashChange(page);
    };

    vm.more = function () {
      nav.hash(++vm.page);
    };

    vm.back = function () {
      var backPage = +vm.page > 2 ? vm.page - 1 : '0';
      nav.hash(backPage);
    };

    function load() {
      feeds.query($scope.fli.route, vm.page)
        .success(function (results) {
          vm.results = results.rows;
          vm.count = Math.ceil(results.count / LIMIT) - 1;
        });
    }

    load();

  });

