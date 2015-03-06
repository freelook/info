'use strict';
angular.module('fli.search')
  .directive('fliSearchInput', function () {
    return {
      controller: 'search.input.ctrl',
      templateUrl: 'components/search/input/input.html'
    };
  });
