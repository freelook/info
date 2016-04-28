'use strict';

angular
  .module('fli.promo')
  .directive('fliPromoAmazon', function ($window, $timeout) {
    return {
      controller: 'promo.amazon.ctrl',
      controllerAs: 'amazonCtrl',
      templateUrl: 'components/promo/amazon/amazon.html',
      link: function (scope, element) {
        var eventName = 'message', bubble = false;
        $window.addEventListener(eventName, function receiveMessage(msg) {
          $window.removeEventListener(eventName, receiveMessage, bubble);
          if (msg && msg.data === 'amazon') {
            $timeout(function () {
              $(element).show();
            });
          }
        }, bubble);
      }
    };
  });
