'use strict';

angular
  .module('fli.board')
  .controller('board.toolbar.ctrl', function(boardEditService) {

    var ctrl = this,
      savedModel = angular.copy(ctrl.model);

    ctrl.editDialog = boardEditService.dialog;
    ctrl.editRedo = function() {
      ctrl.model = savedModel;
    };
    ctrl.toggleEdit = function() {
      ctrl.edit = !ctrl.edit;
    };

  });
