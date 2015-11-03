'use strict';
angular
  .module('fli.show')
  .directive('fliShowInput', function () {
    return {
      controller: 'show.input.ctrl',
      controllerAs: 'showInput',
      templateUrl: 'components/show/input/input.html'
    };
  });
