'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultJobLinkedin', function () {
    return {
      controller: 'search.result.job.linkedin.ctrl',
      controllerAs: 'linkedin',
      templateUrl: 'components/search/result/job/linkedin/linkedin.html'
    };
  });

