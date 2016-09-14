'use strict';

angular
  .module('fli.board')
  .controller('widget.toolbar.build.ctrl', function(widget, widgetBuildService) {
    var ctrl = this;

    ctrl.widgetConfiguration = true;
    ctrl.widgetComponent = false;
    ctrl.models = [
      {
        key: 'template',
        mode: 'html'
      },
      {
        key: 'controller',
        mode: 'javascript'
      },
      {
        key: 'service',
        mode: 'javascript'
      },
      {
        key: 'style',
        mode: 'css'
      }
    ];
    ctrl.model = {};

    ctrl.cancel = widgetBuildService.cancel;
    ctrl.save = widgetBuildService.save;

    widget.loadOne().then(function(widget) {
      ctrl.models.map(function(model) {
        ctrl.model[model.key] = '' + widget[model.key];
      });
    });

  });
