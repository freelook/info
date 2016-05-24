'use strict';

angular
  .module('fli.promo')
  .directive('fliPromoKickstarter', function () {
    return {
      templateUrl: 'components/promo/kickstarter/kickstarter.html',
      controller: 'promo.kickstarter.ctrl',
      controllerAs: 'kickstarterCtrl'
    };

  });
