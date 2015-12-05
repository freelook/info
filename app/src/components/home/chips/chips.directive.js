'use strict';
angular
  .module('fli.home')
  .directive('fliHomeChips',
  function () {
    return {
      controller: 'home.chips.ctrl',
      controllerAs: 'chips',
      templateUrl: 'components/home/chips/chips.html'
    };
  });
