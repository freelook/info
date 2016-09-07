'use strict';

angular
  .module('fli.board')
  .controller('board.toolbar.ctrl', function(boardEditService) {

    var ctrl = this;

    ctrl.dialog = boardEditService.dialog;
    ctrl.redo = function() {
      ctrl.model = ctrl.savedModel;
    };
    ctrl.toggleEdit = function() {
      ctrl.edit = !ctrl.edit;
      ctrl.savedModel = angular.copy(ctrl.model);
    };

  });
