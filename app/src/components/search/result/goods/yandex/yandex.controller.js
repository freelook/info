'use strict';

angular
  .module('fli.search')
  .controller('search.result.goods.yandex.ctrl',
  function ($scope, CONFIG, yandex) {

    var vm = this;
    vm.search = {};

    function setResult(search) {
      vm.search = search || {};
    }

    if ($scope.fli.route.input) {
      yandex.market($scope.fli.route.input)
        .success(setResult);
    }

  });

