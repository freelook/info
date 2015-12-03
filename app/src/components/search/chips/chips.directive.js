'use strict';

angular
  .module('fli.search')
  .directive('fliSearchChips', function () {
    return {
      controller: 'search.chips.ctrl',
      controllerAs: 'chips',
      templateUrl: 'components/search/chips/chips.html'
    };
  });
