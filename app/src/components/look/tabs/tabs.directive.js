'use strict';
angular
  .module('fli.look')
  .directive('fliLookTabs',
  function () {
    return {
      templateUrl: 'components/look/tabs/tabs.html'
    };
  });
