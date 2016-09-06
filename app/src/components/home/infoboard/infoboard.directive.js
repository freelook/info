'use strict';

angular
  .module('fli.home')
  .directive('fliHomeInfoboard', function () {
    return {
      controller: 'home.infoboard.ctrl',
      controllerAs: 'infoboardCtrl',
      templateUrl: 'components/home/infoboard/infoboard.html'
    };
  });
