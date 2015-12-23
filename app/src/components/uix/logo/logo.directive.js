'use strict';
angular
  .module('freelook.info')
  .directive('fliLogo',
  function () {
    return {
      templateUrl: 'components/uix/logo/logo.html'
    };
  });
