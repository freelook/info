'use strict';
angular
  .module('fli.search')
  .directive('fliSearchTabs',
  function () {
    return {
      controller: 'search.tabs.ctrl',
      templateUrl: 'components/search/tabs/tabs.html'
    };
  });
