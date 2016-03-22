'use strict';

angular
  .module('fli.search')
  .controller('search.result.feeds.ctrl',
  function ($timeout, $scope, feeds) {

    var vm = this;
    vm.page = 0;
    vm.results = [];

    vm.more = function () {
      vm.page++;
      load();
    };

    function load() {
      feeds.query($scope.fli.route, vm.page)
        .success(function (results) {
          vm.results = vm.results.concat(results);
        })
        .error(function () {
          vm.page = '$last';
        });
    }

    load();

  });

