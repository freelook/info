'use strict';

angular
  .module('fli.uix')
  .directive('fliHelp', function () {
    return {
      controller: 'help.ctrl',
      controllerAs: 'help',
      templateUrl: 'components/uix/help/help.html'
    };
  });
