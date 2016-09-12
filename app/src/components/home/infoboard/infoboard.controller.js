'use strict';

angular
  .module('fli.home')
  .controller('home.infoboard.ctrl',
  function(board) {

    var ctrl = this,
      user = 'dima.kostrub';

    ctrl.options = {
      debug: true
    };

    board.load(user).then(function(model) {
      ctrl.model = model;
    });

  });

