'use strict';
angular
  .module('fli.search')
  .directive('fliSearchLucky',
  function () {
    return {
      controller: 'search.lucky.ctrl',
      controllerAs: 'lucky',
      templateUrl: 'components/search/menu/lucky/lucky.html'
    };
  });
