'use strict';

angular
  .module('fli.look')
  .controller('look.content.rich.ctrl',
  function ($scope, yandex) {

    var vm = this;

    vm.setItem = angular.noop;

    if ($scope.fli.route.url) {
      yandex.rich(decodeURIComponent($scope.fli.route.url))
        .success(function (rich) {
          vm.item = rich;
          vm.setItem(rich);
        });
    }

  });


