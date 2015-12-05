'use strict';
angular
  .module('fli.home')
  .directive('fliHomeChipsType',
  function () {
    return {
      controller: 'home.chips.type.ctrl',
      controllerAs: 'typeCtrl',
      templateUrl: 'components/home/chips/type/type.html'
    };
  });
