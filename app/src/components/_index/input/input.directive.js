'use strict';
angular.module('freelook.info')
  .directive('fliInput', function () {
    return {
      templateUrl: 'components/_index/input/input.html',
      controller: 'input.ctrl',
      controllerAs: 'inpt'
    };
  });
