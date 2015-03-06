'use strict';

angular
  .module('fli.look',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/look', {
        templateUrl: 'components/look/look.html',
        controller: 'look.ctrl'
      });

  });
