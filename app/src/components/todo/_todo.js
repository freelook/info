'use strict';

angular
  .module('fli.todo', [])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/todo', {
        templateUrl: 'components/todo/todo.html',
        controller: 'todo.ctrl',
        controllerAs: 'todoCtrl'
      });

  });

