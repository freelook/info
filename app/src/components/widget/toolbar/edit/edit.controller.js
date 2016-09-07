'use strict';

angular
  .module('fli.board')
  .controller('widget.toolbar.edit.ctrl', function(widgetEditService) {
    var ctrl = this;

    ctrl.cancel = widgetEditService.cancel;
    ctrl.save = widgetEditService.save;

  });
