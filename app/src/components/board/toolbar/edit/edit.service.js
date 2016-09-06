'use strict';

angular
  .module('fli.board')
  .service('boardEditService', function($mdDialog) {

    function dialog(model) {
      $mdDialog.show({
        templateUrl: 'components/board/toolbar/edit/edit.html',
        controller: 'board.toolbar.edit.ctrl',
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
