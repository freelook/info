'use strict';
angular
  .module('fli.search')
  .directive('fliSearchChipsTypeSub',
  function () {
    return {
      controller: 'search.chips.type.sub.ctrl',
      controllerAs: 'subCtrl',
      templateUrl: 'components/search/chips/type/sub/sub.html'
    };
  });
