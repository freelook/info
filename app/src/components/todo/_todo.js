'use strict';

angular
  .module('fli.todo',
  ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/todo', {
        templateUrl: 'components/todo/todo.html',
        controller: 'todo.ctrl'
      });

  });

