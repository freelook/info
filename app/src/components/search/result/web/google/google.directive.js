'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultWebGoogle', function () {
    return {
      controller: 'search.result.web.google.ctrl',
      controllerAs: 'google',
      templateUrl: 'components/search/result/web/google/google.html'
    };
  });

