'use strict';

angular
  .module('fli.widget')
  .controller('widget.toolbar.ctrl', function(widgetEditService) {

    var ctrl = this;

    ctrl.dialog = widgetEditService.dialog;
    ctrl.remove = widgetEditService.remove;
    ctrl.toggleEdit = function() {
      ctrl.edit = !ctrl.edit;
    };

  });
