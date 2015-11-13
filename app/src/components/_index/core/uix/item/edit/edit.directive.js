'use strict';
angular
  .module('freelook.info')
  .directive('fliItemEdit', function () {
    return {
      replace: true,
      transclude: true,
      controller: 'item.edit.ctrl',
      controllerAs: 'fliItemCtrl',
      templateUrl: 'components/_index/core/uix/item/edit/edit.html'
    };
  });

