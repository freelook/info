'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultWebLinkedin', function () {
    return {
      controller: 'search.result.web.linkedin.ctrl',
      controllerAs: 'linkedin',
      templateUrl: 'components/search/result/web/linkedin/linkedin.html'
    };
  });

