'use strict';
angular
  .module('fli.search')
  .directive('fliSearchTabs',
  function () {
    return {
      controller: 'search.tabs.ctrl',
      controllerAs: 'tabs',
      templateUrl: 'components/search/tabs/tabs.html'
    };
  });
