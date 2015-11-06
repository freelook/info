'use strict';
angular
  .module('fli.show')
  .directive('fliShowItemConfig', function () {
    return {
      controller: 'show.item.config.ctrl',
      controllerAs: 'showItemConfig',
      templateUrl: 'components/show/item/config/config.html'
    };
  });
