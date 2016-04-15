'use strict';
angular
  .module('fli.uix')
  .directive('fliApps', function () {
    return {
      controller: 'apps.ctrl',
      controllerAs: 'apps',
      templateUrl: 'components/uix/footer/apps/apps.html'
    };
  });
