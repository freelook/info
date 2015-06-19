'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultWebAll', function () {
    return {
      controller: 'search.result.web.all.ctrl',
      controllerAs: 'all',
      templateUrl: 'components/search/result/web/all/all.html'
    };
  });

