'use strict';

angular
  .module('fli.board')
  .factory('BOARDS',
  function($q, storage) {

    var mockModel = {
      user: 'dima.kostrub',
      title: 'My infoboard',
      columns: [{
        flex: 40,
        widgets: []
      }, {
        flex: 60,
        widgets: []
      }]
    };

    function get(user) {
      return $q.when(storage.get(user, angular.copy(mockModel)));
    }

    function post(board) {
      storage.set(board.user, board, storage.parser.func);
      return $q.when(board);
    }

    return {
      get: get,
      post: post
    };

  });
