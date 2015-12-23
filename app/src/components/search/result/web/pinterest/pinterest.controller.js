'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.pinterest.ctrl',
  function ($scope, pinterest, item) {

    var vm = this;

    vm.link = pinterest.link;
    vm.href = item.href;
    vm.share = item.share;

    vm.board = function (_board) {
      return vm.href({
        url: vm.link(_board.url),
        img: _board.img
      });
    };

    function setResult(pins) {
      vm.pins = pins || [];
    }

    pinterest.search($scope.fli.route.input || '')
      .then(setResult);

  });

