'use strict';
angular.module('fli.show')
  .directive('fliShowItemLink', function () {
    return {
      controller: 'show.item.link.ctrl',
      controllerAs: 'linkItem',
      templateUrl: 'components/show/item/link/link.html'
    };
  });
