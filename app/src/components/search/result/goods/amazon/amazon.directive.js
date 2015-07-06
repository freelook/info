'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultGoodsAmazon', function () {
    return {
      controller: 'search.result.goods.amazon.ctrl',
      controllerAs: 'amazon',
      templateUrl: 'components/search/result/goods/amazon/amazon.html'
    };
  });

