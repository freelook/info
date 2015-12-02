'use strict';

angular
  .module('fli.look')
  .directive('fliLookChips', function () {
    return {
      controller: 'look.chips.ctrl',
      controllerAs: 'chips',
      templateUrl: 'components/look/chips/chips.html'
    };
  });
