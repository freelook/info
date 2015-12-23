'use strict';
angular.module('freelook.info')
  .directive('fliInput', function () {
    return {
      templateUrl: 'components/uix/input/input.html',
      controller: 'input.ctrl',
      controllerAs: 'input'
    };
  });
