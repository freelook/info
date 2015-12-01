'use strict';
angular
  .module('fli.search')
  .directive('fliSearchResultPeopleVk', function () {
    return {
      controller: 'search.result.people.vk.ctrl',
      controllerAs: 'vk',
      templateUrl: 'components/search/result/people/vk/vk.html'
    };
  });

