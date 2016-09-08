'use strict';

angular
  .module('fli.board')
  .controller('board.toolbar.ctrl', function(boardEditService, boardAddService) {

    var ctrl = this;

    ctrl.editDialog = boardEditService.dialog;
    ctrl.addDialog = boardAddService.dialog;
    ctrl.redo = function() {
      ctrl.model = ctrl.savedModel;
    };
    ctrl.toggleEdit = function() {
      ctrl.edit = !ctrl.edit;
      ctrl.savedModel = angular.copy(ctrl.model);
    };

  });
