'use strict';

angular
  .module('fli.search')
  .controller('search.result.goods.amazon.ctrl',
  function ($scope, api, lucky) {

    var vm = this;
    vm.search = {};

    function setResult(search) {
      vm.search = !!search.ItemSearchResponse ? search.ItemSearchResponse.Items[0] : {};
    }

    api.goods($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

