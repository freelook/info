'use strict';
angular
  .module('freelook.info')
  .directive('fliItem', function () {
    return {
      replace: true,
      transclude: true,
      controller: 'item.ctrl',
      controllerAs: 'fliItemCtrl',
      templateUrl: 'components/uix/item/item.html'
    };
  });

