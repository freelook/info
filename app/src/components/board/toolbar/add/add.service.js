'use strict';

angular
  .module('fli.board')
  .service('boardAddService', function($mdDialog) {

    function dialog(model) {
      $mdDialog.show({
        templateUrl: 'components/board/toolbar/add/add.html',
        controller: 'board.toolbar.add.ctrl',
        controllerAs: 'addCtrl',
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
