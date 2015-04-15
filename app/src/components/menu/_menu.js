'use strict';

angular
  .module('fli.menu',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/menu', {
        templateUrl: 'components/menu/menu.html',
        controller: 'menu.ctrl'
      });

  });
