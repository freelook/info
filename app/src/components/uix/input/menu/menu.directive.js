'use strict';
angular
  .module('freelook.info')
  .directive('fliInputMenu', function () {
    return {
      controller: 'input.menu.ctrl',
      controllerAs: 'menuCtrl',
      templateUrl: 'components/uix/input/menu/menu.html'
    };
  });
