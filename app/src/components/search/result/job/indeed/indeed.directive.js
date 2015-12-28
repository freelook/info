'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultJobIndeed', function () {
    return {
      controller: 'search.result.job.indeed.ctrl',
      controllerAs: 'indeed',
      templateUrl: 'components/search/result/job/indeed/indeed.html'
    };
  });

