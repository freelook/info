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

    return {
      dialog: dialog,
      cancel: cancel
    };
  });
