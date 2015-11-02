'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPromo', function () {
    return {
      controller: 'search.result.promo.ctrl',
      controllerAs: 'promo',
      templateUrl: 'components/search/result/promo/promo.html'
    };
  });

