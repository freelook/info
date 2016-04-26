'use strict';

angular
  .module('fli.promo')
  .directive('fliPromo', function ($timeout, promo) {
    return {
      templateUrl: 'components/promo/promo.html',
      link: function () {
        promo.init();
      }
    };

  });
