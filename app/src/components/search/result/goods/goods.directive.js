'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultGoods', function () {
    return {
      controller: 'search.result.goods.ctrl',
      controllerAs: 'goods',
      templateUrl: 'components/search/result/goods/goods.html'
    };
  });

