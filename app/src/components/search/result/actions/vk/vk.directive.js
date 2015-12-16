'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultActionsVk', function () {
    return {
      controller: 'search.result.actions.vk.ctrl',
      controllerAs: 'vk',
      templateUrl: 'components/search/result/actions/vk/vk.html'
    };
  });

