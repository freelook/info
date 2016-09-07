'use strict';

angular
  .module('fli.widget')
  .controller('widget.ctrl', function(board) {
    var ctrl = this,
      model = angular.extend(ctrl.widget, board.widgets[ctrl.widget.name]);

    if (!model.wid) {
      model.wid = board.id();
    }

    ctrl.model = model;

  });
