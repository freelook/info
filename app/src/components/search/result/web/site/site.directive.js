'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultWebSite', function () {
    return {
      controller: 'search.result.web.site.ctrl',
      controllerAs: 'site',
      templateUrl: 'components/search/result/web/site/site.html'
    };
  });

