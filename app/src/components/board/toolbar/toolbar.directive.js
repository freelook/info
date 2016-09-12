'use strict';

angular
  .module('fli.board')
  .directive('fliBoardToolbar', function() {
    return {
      templateUrl: 'components/board/toolbar/toolbar.html',
      controller: 'board.toolbar.ctrl',
      controllerAs: 'toolbarCtrl',
      bindToController: {
        model: '=',
        options: '='
      }
    };
  });
