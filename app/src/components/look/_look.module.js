(function () {
  'use strict';

  window.i18n.ru.look = {};
  window.i18n.en.look = {};

  angular
    .module('fli.look', [])
    .config(function ($routeProvider) {

      // Routes config
      $routeProvider
        .when('/look', {
          templateUrl: 'components/look/look.html',
          controller: 'look.ctrl',
          controllerAs: 'look'
        });

    })
    .constant('LOOK_KEY', 'FLI:LOOK');

}());
