'use strict';

angular
  .module('fli.board')
  .controller('board.toolbar.add.ctrl', function(board, boardAddService) {
    var ctrl = this;

    ctrl.cancel = boardAddService.cancel;
    ctrl.code = JSON.stringify(board.widgets.linklist.view.controller);

  });
