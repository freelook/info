'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResult', function () {
    return {
      controller: 'search.result.ctrl',
      controllerAs: 'result',
      templateUrl: 'components/search/result/result.html'
    };
  });
