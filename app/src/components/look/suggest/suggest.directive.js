'use strict';
angular
  .module('fli.search')
  .directive('fliLookSuggest',
  function () {
    return {
      controller: 'look.suggest.ctrl',
      controllerAs: 'suggest',
      templateUrl: 'components/look/suggest/suggest.html'
    };
  });
