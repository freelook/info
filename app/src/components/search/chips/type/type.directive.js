'use strict';
angular
  .module('fli.search')
  .directive('fliSearchChipsType',
  function () {
    return {
      controller: 'search.chips.type.ctrl',
      controllerAs: 'typeCtrl',
      templateUrl: 'components/search/chips/type/type.html'
    };
  });
