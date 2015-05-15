'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResult', function () {
    return {
      controller: 'search.result.ctrl',
      templateUrl: 'components/search/result/result.html'
    };
  });
