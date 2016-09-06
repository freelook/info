'use strict';

angular
  .module('fli.widget')
  .controller('widget.ctrl', function(board) {
    var ctrl = this;

    ctrl.model = angular.extend(ctrl.widget, board.widgets[ctrl.widget.name]);

  });
