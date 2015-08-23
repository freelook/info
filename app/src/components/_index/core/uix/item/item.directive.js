'use strict';
angular
  .module('freelook.info')
  .directive('fliItem', function () {
    return {
      replace: true,
      transclude: true,
      controller: 'item.ctrl',
      controllerAs: 'fliItemCtrl',
      templateUrl: 'components/_index/core/uix/item/item.html'
    };
  });

