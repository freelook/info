'use strict';

angular
  .module('fli.widget')
  .service('widgetEditService', function($mdDialog) {

    function dialog(model) {
      $mdDialog.show({
        templateUrl: 'components/widget/toolbar/edit/edit.html',
        controller: 'widget.toolbar.edit.ctrl',
        controllerAs: 'editCtrl',
        locals: {
          model: model
        },
        bindToController: true,
        clickOutsideToClose: true,
        fullscreen: true
      });
    }

    function cancel() {
      $mdDialog.cancel();
    }

    function remove(model, widgets) {
      if (model && widgets) {
        var index = widgets.indexOf(model);
        if (!!~index) {
          widgets.splice(index, 1);
        }
      }
    }

    function save(model) {
      $('#' + model.wid + '-edit').get(0).contentWindow.postMessage('push', '*');
      window.addEventListener('message', pull, false);
      function pull(event) {
        console.log('get msg', event);
      }
    }

    return {
      dialog: dialog,
      cancel: cancel,
      remove: remove,
      save: save
    };
  });
