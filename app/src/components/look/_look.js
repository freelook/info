'use strict';

angular
  .module('fli.look', [])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/look', {
        templateUrl: 'components/look/look.html',
        controller: 'look.ctrl'
      });

  })
  .constant('LOOK_KEY', 'FLI:LOOK');
