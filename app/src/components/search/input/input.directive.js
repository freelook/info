'use strict';
angular.module('fli.search')
  .directive('fliInput', function () {
    return {
      controller: 'InputCtrl',
      templateUrl: 'components/search/input/input.html'
    };
  });
