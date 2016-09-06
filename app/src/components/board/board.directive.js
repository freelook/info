'use strict';

angular
  .module('fli.board')
  .directive('fliBoard', function() {
    return {
      templateUrl: 'components/board/board.html',
      controller: 'board.ctrl',
      controllerAs: 'boardCtrl',
      bindToController: {
        model: '='
      }
    };
  });
