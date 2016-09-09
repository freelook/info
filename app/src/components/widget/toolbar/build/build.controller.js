'use strict';

angular
  .module('fli.board')
  .controller('widget.toolbar.build.ctrl', function(widgetBuildService) {
    var ctrl = this;

    ctrl.cancel = widgetBuildService.cancel;
    ctrl.save = widgetBuildService.save;

  });
