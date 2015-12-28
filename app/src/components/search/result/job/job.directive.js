'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultJob', function () {
    return {
      controller: 'search.result.job.ctrl',
      controllerAs: 'job',
      templateUrl: 'components/search/result/job/job.html'
    };
  });

