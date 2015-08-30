'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultVideoGoogle', function () {
    return {
      controller: 'search.result.video.google.ctrl',
      controllerAs: 'videoGoogle',
      templateUrl: 'components/search/result/video/google/google.html'
    };
  });

