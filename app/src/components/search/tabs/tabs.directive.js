'use strict';
angular
  .module('fli.search')
  .directive('searchTabs',
  function () {
    return {
      controller: 'search.tabs.ctrl',
      templateUrl: 'components/search/tabs/tabs.html'
    };
  });
