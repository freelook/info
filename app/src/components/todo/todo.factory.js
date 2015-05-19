'use strict';

angular
  .module('fli.todo')
  .factory('todo',
  function ($http, CONFIG) {

    function get() {
      return $http.get(CONFIG.API.URL + 'todo')
        .error(function (data) {
          console.log('Error: ' + data);
        });
    }

    function add(todo) {
      return $http.post(CONFIG.API.URL + 'todo', todo)
        .error(function (data) {
          console.log('Error: ' + data);
        });
    }

    function del(id) {
      return $http.delete(CONFIG.API.URL + 'todo/' + id)
        .error(function (data) {
          console.log('Error: ' + data);
        });
    }

    return {
      get: get,
      add: add,
      del: del
    }

  });
