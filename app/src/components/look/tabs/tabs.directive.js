'use strict';
angular
  .module('fli.look')
  .directive('fliLookTabs',
  function () {
    return {
      controller: 'look.tabs.ctrl',
      controllerAs: 'tabs',
      templateUrl: 'components/look/tabs/tabs.html'
    };
  });
