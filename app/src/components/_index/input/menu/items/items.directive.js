'use strict';
angular
  .module('freelook.info')
  .directive('fliMenuItems', function () {
    return {
      controller: 'menu.items.ctrl',
      controllerAs: 'itemCtrl',
      templateUrl: 'components/_index/input/menu/items/items.html'
    };
  });
