'use strict';
angular.module('fli.uix')
  .directive('fliFooter', function () {
    return {
      templateUrl: 'components/uix/footer/footer.html',
      controller: 'footer.ctrl',
      controllerAs: 'footer'
    };
  });
