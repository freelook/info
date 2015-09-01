'use strict';

angular
  .module('fli.todo')
  .factory('todo',
  function (Parse) {

    var TODO = Parse.Object.extend('TODO'),
      query = new Parse.Query(TODO);


    function get() {
      return query.find();
    }

    function add(_todo) {
      var todo = new TODO();
      return todo.save(_todo);
    }

    function del(_todo) {
      return _todo.destroy();
    }

    return {
      get: get,
      add: add,
      del: del
    };

  });
