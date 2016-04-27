'use strict';

angular
  .module('fli.promo')
  .directive('fliPromoFacebook', function (FB) {
    return {
      templateUrl: 'components/promo/facebook/facebook.html',
      link: function () {
        FB.promo();
      }
    };

  });
