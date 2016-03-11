'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultFeeds', function () {
    return {
      controller: 'search.result.feeds.ctrl',
      controllerAs: 'feeds',
      templateUrl: 'components/search/result/feeds/feeds.html'
    };
  });

