'use strict';
angular.module('fli.menu')
.directive('fliMenuItems', function() {
    return {
      controller: 'menu.items.ctrl',
      templateUrl: 'components/menu/items/items.html'
    };
  });
