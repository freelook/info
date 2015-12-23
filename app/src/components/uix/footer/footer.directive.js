'use strict';
angular.module('freelook.info')
  .directive('fliFooter', function () {
    return {
      templateUrl: 'components/uix/footer/footer.html',
      controller: 'footer.ctrl',
      controllerAs: 'footer'
    };
  });
