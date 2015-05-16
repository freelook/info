'use strict';
angular
  .module('freelook.info')
  .directive('fliMenuItems', function () {
    return {
      controller: 'menu.items.ctrl',
      templateUrl: 'components/_index/input/menu/items/items.html'
    };
  });
