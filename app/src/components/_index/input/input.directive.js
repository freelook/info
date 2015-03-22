'use strict';
angular.module('fli.search')
  .directive('fliInput', function () {
    return {
      controller: 'input.ctrl',
      templateUrl: 'components/_index/input/input.html',
      link: function (scope, element, attrs) {
        scope.icon = attrs.icon || 'bars';
      }
    };
  });
