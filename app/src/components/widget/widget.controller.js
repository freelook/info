'use strict';

angular
  .module('fli.widget')
  .controller('widget.ctrl', function(board, widget) {
    var ctrl = this;

    widget.loadOne(ctrl.widget.name).then(function(widget) {
      var model = angular.extend(widget, ctrl.widget);
      if (!model.wid) {
        model.wid = board.id();
      }
      ctrl.model = model;
    });

  });
