'use strict';
angular
  .module('fli.search')
  .directive('fliHomeTabs',
  function () {
    return {
      controller: 'home.tabs.ctrl',
      controllerAs: 'tabs',
      templateUrl: 'components/home/tabs/tabs.html'
    };
  });
