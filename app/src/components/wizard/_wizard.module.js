(function () {
  'use strict';

  window.i18n.ru.wizard = {};
  window.i18n.en.wizard = {};

  angular
    .module('fli.wizard', [])
    .config(function ($routeProvider) {

      // Routes config
      $routeProvider
        .when('/wizard', {
          templateUrl: 'components/wizard/wizard.html',
          controller: 'wizard.ctrl',
          controllerAs: 'wizard'
        });

    });

}());
