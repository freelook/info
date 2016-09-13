'use strict';

angular
  .module('fli.board')
  .service('boardAddService', function($mdDialog, board) {

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

    function add(widget, model) {
      if (!widget.wid) {
        widget.wid = board.id();
      }
      model.columns[0].widgets.push(widget);
      cancel();
    }

    return {
      dialog: dialog,
      cancel: cancel,
      add: add
    };
  });
