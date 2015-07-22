'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultNews', function () {
    return {
      controller: 'search.result.news.ctrl',
      controllerAs: 'news',
      templateUrl: 'components/search/result/news/news.html'
    };
  });

