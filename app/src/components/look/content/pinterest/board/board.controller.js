'use strict';

angular
  .module('fli.look')
  .controller('look.content.pinterest.board.ctrl',
  function ($scope, $parse, pinterest, item) {

    var vm = this;

    vm.href = item.href;

    function setResult(res) {
      vm.pins = $parse('data.pins')(res) || [];
      $scope.pinterest.user = $parse('data.user')(res);
    }

    if ($scope.fli.route.input) {
      pinterest.boards($scope.pinterest.pathname)
        .success(setResult);
    }

  });
