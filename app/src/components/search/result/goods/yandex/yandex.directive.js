'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultGoodsYandex', function () {
    return {
      controller: 'search.result.goods.yandex.ctrl',
      controllerAs: 'ya',
      templateUrl: 'components/search/result/goods/yandex/yandex.html'
    };
  });

