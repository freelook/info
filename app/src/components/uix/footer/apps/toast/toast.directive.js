'use strict';
angular
  .module('fli.uix')
  .directive('fliAppsToast', function () {
    return {
      controller: 'apps.ctrl',
      controllerAs: 'apps',
      templateUrl: 'components/uix/footer/apps/toast/toast.html'
    };
  });
