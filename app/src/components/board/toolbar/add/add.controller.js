'use strict';

angular
  .module('fli.board')
  .controller('board.toolbar.add.ctrl', function(board, widget, boardAddService, widgetBuildService) {
    var ctrl = this;

    ctrl.cancel = boardAddService.cancel;
    ctrl.add = boardAddService.add;
    ctrl.build = function() {
      ctrl.cancel();
      widgetBuildService.dialog();
    };
    widget.load().then(function(widgets) {
      ctrl.widgets = widgets;
    });

  });
