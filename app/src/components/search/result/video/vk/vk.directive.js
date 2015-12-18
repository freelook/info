'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultVideoVk', function () {
    return {
      controller: 'search.result.video.vk.ctrl',
      controllerAs: 'vk',
      templateUrl: 'components/search/result/video/vk/vk.html'
    };
  });

