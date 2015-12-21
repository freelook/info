'use strict';

angular
  .module('fli.look')
  .controller('look.content.pinterest.board.ctrl',
  function ($scope, $parse, pinterest) {

    var vm = this;

    function setResult(res) {
      vm.pins = $parse('data.pins')(res) || [];
    }

    if ($scope.fli.route.input) {
      pinterest.boards($scope.pinterest.pathname)
        .success(setResult);
    }

  });
