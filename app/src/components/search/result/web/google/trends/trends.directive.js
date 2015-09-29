'use strict';
angular
  .module('fli.home')
  .directive('fliSearchResultWebGoogleTrends', function () {
    return {
      controller: 'search.result.web.google.trends.ctrl',
      controllerAs: 'hotTrends',
      templateUrl: 'components/search/result/web/google/trends/trends.html'
    };
  });

