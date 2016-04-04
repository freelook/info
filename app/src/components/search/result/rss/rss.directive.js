'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultRss', function () {
    return {
      controller: 'search.result.rss.ctrl',
      controllerAs: 'rss',
      templateUrl: 'components/search/result/rss/rss.html'
    };
  });

