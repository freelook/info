'use strict';

angular
  .module('fli.search')
  .controller('search.result.goods.yandex.ctrl',
  function ($scope, yandex) {

    var vm = this;
    vm.search = {};

    function setResult(search) {
      vm.search = search || {};
    }

    yandex.market($scope.fli.route.input || '')
      .success(setResult);

  });

