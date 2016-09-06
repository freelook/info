'use strict';

angular
  .module('fli.widget')
  .controller('widget.toolbar.ctrl', function(widgetEditService) {

    var ctrl = this,
      savedModel = angular.copy(ctrl.model);

    ctrl.editDialog = widgetEditService.dialog;
    ctrl.editRedo = function() {
      ctrl.model = savedModel;
    };
    ctrl.toggleEdit = function() {
      ctrl.edit = !ctrl.edit;
    };

  });
