'use strict';

angular
  .module('fli.board')
  .controller('board.toolbar.edit.ctrl', function(boardEditService) {
    var ctrl = this;

    ctrl.cancel = boardEditService.cancel;

  });
