'use strict';
angular
  .module('freelook.info')
  .directive('fliApps', function () {
    return {
      controller: 'apps.ctrl',
      controllerAs: 'apps',
      templateUrl: 'components/_index/core/uix/apps/apps.html'
    };
  });
