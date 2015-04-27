'use strict';
angular.module('freelook.info')
  .directive('fliInput', function () {
    return {
      scope: {
        icon: '@',
        fliHref: '@'
      },
      templateUrl: 'components/_index/input/input.html',
      controller: 'input.ctrl'
    };
  });
