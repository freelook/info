'use strict';

angular
  .module('fli.widget')
  .service('widgetEditService', function($mdDialog) {

    function dialog(model, options) {
      $mdDialog.show({
        templateUrl: 'components/widget/toolbar/edit/edit.html',
        controller: 'widget.toolbar.edit.ctrl',
        controllerAs: 'editCtrl',
        locals: {
          model: model,
          options: options
        },
        bindToController: true,
        clickOutsideToClose: true,
        fullscreen: true
      });
      options.dialog = true;
    }

    function cancel(model, options) {
      options.dialog = false;
      $mdDialog.cancel(model);
    }

    function remove(model, widgets) {
      if (model && widgets) {
        widgets.map(function(el, index) {
          if (el.wid === model.wid) {
            widgets.splice(index, 1);
          }
        });
      }
    }

    return {
      dialog: dialog,
      cancel: cancel,
      remove: remove
    };
  });
