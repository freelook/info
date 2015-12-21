'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.pinterest.ctrl',
  function ($scope, $parse, pinterest, item) {

    var vm = this;

    vm.link = pinterest.link;
    vm.href = item.href;
    vm.share = item.share;

    vm.board = function (_board) {
      return vm.href({
        url: vm.link(_board.url),
        img: _board.image_thumbnail_url
      });
    };

    function setResult(res) {
      vm.pins = $parse('data.pins')(res) || [];
    }

    if ($scope.fli.route.input) {
      pinterest.pins($scope.fli.route.input)
        .success(setResult);
    }

  });

