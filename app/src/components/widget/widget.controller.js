'use strict';

angular
  .module('fli.widget')
  .controller('widget.ctrl', function(board, widget) {
    var ctrl = this;

    widget.loadOne(ctrl.widget.name).then(function(widget) {
      ctrl.model = angular.extend(widget, ctrl.widget);
    });

  });
