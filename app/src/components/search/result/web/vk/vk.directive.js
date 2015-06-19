'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultWebVk', function () {
    return {
      controller: 'search.result.web.vk.ctrl',
      controllerAs: 'vk',
      templateUrl: 'components/search/result/web/vk/vk.html'
    };
  });

