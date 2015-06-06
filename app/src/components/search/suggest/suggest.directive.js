'use strict';
angular
  .module('fli.search')
  .directive('fliSearchSuggest',
  function () {
    return {
      controller: 'search.suggest.ctrl',
      controllerAs: 'suggest',
      templateUrl: 'components/search/suggest/suggest.html'
    };
  });
