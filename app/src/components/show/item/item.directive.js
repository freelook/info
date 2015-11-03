'use strict';
angular
  .module('fli.show')
  .directive('fliShowItem', function () {
    return {
      controller: 'show.item.ctrl',
      controllerAs: 'showItem',
      templateUrl: 'components/show/item/item.html'
    };
  });
