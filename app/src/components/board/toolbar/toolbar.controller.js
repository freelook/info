'use strict';

angular
  .module('fli.board')
  .controller('board.toolbar.ctrl', function(board, boardEditService, boardAddService) {

    var ctrl = this;

    ctrl.editDialog = boardEditService.dialog;
    ctrl.addDialog = boardAddService.dialog;
    ctrl.redo = function() {
      ctrl.model = ctrl.savedModel;
    };
    ctrl.toggleEdit = function() {
      ctrl.edit = !ctrl.edit;
      if (!ctrl.edit) {
        board.save(ctrl.model);
      } else {
        ctrl.savedModel = angular.copy(ctrl.model);
      }
    };

  });
