'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultVideo', function () {
    return {
      controller: 'search.result.video.ctrl',
      controllerAs: 'video',
      templateUrl: 'components/search/result/video/video.html'
    };
  });

