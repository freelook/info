'use strict';

angular
  .module('fli.promo')
  .directive('fliPromoAmazon', function () {
    return {
      controller: 'promo.amazon.ctrl',
      controllerAs: 'amazonCtrl',
      templateUrl: 'components/promo/amazon/amazon.html'
    };
  });
