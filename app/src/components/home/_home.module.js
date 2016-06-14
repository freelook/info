(function () {
  'use strict';

  window.i18n.ru.home = {};
  window.i18n.en.home = {};

  angular
    .module('fli.home', [])
    .config(function ($routeProvider) {

      // Routes config
      $routeProvider
        .when('/', {
          templateUrl: 'components/home/home.html',
          controller: 'home.ctrl',
          controllerAs: 'homeCtrl'
        });

      $routeProvider
        .when('/~/:nickname?', {
          templateUrl: 'components/home/home.html',
          controller: 'home.ctrl',
          controllerAs: 'homeCtrl'
        });

    });

}());
