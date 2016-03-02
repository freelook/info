'use strict';
angular
  .module('freelook.info')
  .directive('fliItemEdit', function () {
    return {
      replace: true,
      transclude: true,
      scope: true,
      controller: 'item.edit.ctrl',
      controllerAs: 'fliItemCtrl',
      templateUrl: 'components/uix/item/edit/edit.html',
      bindToController: {
        small: '=',
        url: '=',
        img: '=',
        name: '=',
        content: '='
      }
    };
  });

