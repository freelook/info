'use strict';

angular
  .module('fli.widget')
  .controller('widget.ctrl', function(board, widget) {
    var ctrl = this;

    widget.load().then(function(widgets) {
      var model = angular.extend(ctrl.widget, widgets[0]);
      if (!model.wid) {
        model.wid = board.id();
      }
      ctrl.model = model;
    });

  });
