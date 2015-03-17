'use strict';
angular.module('fli.search')
  .directive('fliSearchInput', function () {
    return {
      controller: 'input.ctrl',
      templateUrl: 'components/_index/input/input.html'
    };
  });
