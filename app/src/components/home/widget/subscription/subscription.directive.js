'use strict';
angular
  .module('fli.home')
  .directive('fliHomeWidgetSubscription', function () {
    return {
      controller: 'home.widget.subscription.ctrl',
      controllerAs: 'subscription',
      templateUrl: 'components/home/widget/subscription/subscription.html'
    };
  });

