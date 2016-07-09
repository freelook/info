(function () {
  'use strict';

  window.i18n.ru.profile = {};
  window.i18n.en.profile = {};

  angular
    .module('fli.profile', [])
    .config(function ($routeProvider) {

      // Routes config
      $routeProvider
        .when('/~/:nickname?', {
          templateUrl: 'components/profile/profile.html',
          controller: 'profile.ctrl',
          controllerAs: 'profile'
        });

    });

}());
