'use strict';
angular.module('freelook.info')
  .directive('fliInput', function () {
    return {
      controller: 'InputCtrl',
      templateUrl: 'components/input/input.html'
    };
  });
