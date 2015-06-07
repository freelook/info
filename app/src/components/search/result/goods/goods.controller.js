'use strict';

angular
  .module('fli.search')
  .controller('search.result.goods.ctrl',
  function ($scope, CONFIG, api) {

    var vm = this;
    vm.search = {};

    function setResult(search) {
      vm.search = !!search.ItemSearchResponse ? search.ItemSearchResponse.Items[0] : {};
    }

    if ($scope.fli.route.input) {
      api.goods($scope.fli.route.input)
        .success(setResult);
    }

  });

