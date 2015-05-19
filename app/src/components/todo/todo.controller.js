'use strict';

angular
  .module('fli.todo')
  .controller('todo.ctrl',
  function ($rootScope, $routeParams, $scope, $mdMedia, DEFAULT_TITLE, DEFAULT_DESCRIPTION, todo) {

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = 'FLI - todo list';
    $rootScope.fli.description = DEFAULT_DESCRIPTION;

    function init(todos) {
      $scope.todos = todos || [];
      $scope.text = '';
    }

    init();

    $scope.add = function (form) {
      var _todo = {
        text: $scope.text || ''
      };
      todo.add(_todo).success(init);
    };

    $scope.del = function (_todo) {
      todo.del(_todo._id).success(init);
    };

    todo.get().success(init);

  });
