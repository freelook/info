'use strict';
angular.module('freelook.info')
  .directive('fliInput', function () {
    return {
      scope: {
        icon: '@'
      },
      templateUrl: 'components/_index/input/input.html',
      controller: 'input.ctrl'
    };
  });
