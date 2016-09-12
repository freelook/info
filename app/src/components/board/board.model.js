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
      return $q.when(storage.get(user, mockModel));
    }

    function post(board) {
      storage.set(board.user, board, function(key, val) {
        return typeof val === 'function' ? '' + val : val;
      });
      return $q.when(board);
    }

    return {
      get: get,
      post: post
    };

  });
