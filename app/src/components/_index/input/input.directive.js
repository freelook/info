'use strict';
angular.module('freelook.info')
  .directive('fliInput', function () {
    return {
      templateUrl: 'components/_index/input/input.html',
      controller: 'input.ctrl',
      scope: true,
      controllerAs: 'input',
      bindToController: {
        placeholder: '=',
        type: '=',
        find: '='
      },
      link: function (scope) {
        scope.inptElement = $('#input');
      }
    };
  });
