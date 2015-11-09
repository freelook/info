'use strict';
angular
  .module('fli.show')
  .directive('fliShowItemForm', function () {
    return {
      controller: 'show.item.form.ctrl',
      controllerAs: 'showItemForm',
      templateUrl: 'components/show/item/form/form.html'
    };
  });
