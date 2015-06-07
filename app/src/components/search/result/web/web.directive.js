'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultWeb', function () {
    return {
      controller: 'search.result.web.ctrl',
      controllerAs: 'web',
      templateUrl: 'components/search/result/web/web.html'
    };
  });

