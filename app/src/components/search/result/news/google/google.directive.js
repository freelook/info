'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultNewsGoogle', function () {
    return {
      controller: 'search.result.news.google.ctrl',
      controllerAs: 'newsGoogle',
      templateUrl: 'components/search/result/news/google/google.html'
    };
  });

