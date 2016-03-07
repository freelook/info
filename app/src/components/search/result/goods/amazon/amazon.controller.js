'use strict';

angular
  .module('fli.search')
  .controller('search.result.goods.amazon.ctrl',
  function ($scope, api, share, lucky) {

    var vm = this;
    vm.search = {};
    vm.href = function () {
      return '#';
    };
    vm.share = function (_item) {
      return share.url(_item.url);
    };

    function setResult(search) {
      vm.search = !!search.ItemSearchResponse ? search.ItemSearchResponse.Items[0] : {};
    }

    api.goods($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

