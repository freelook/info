'use strict';
angular
  .module('fli.uix')
  .directive('fliVersion', function () {
    return {
      controller: 'version.ctrl',
      controllerAs: 'version',
      templateUrl: 'components/uix/footer/version/version.html'
    };
  });
