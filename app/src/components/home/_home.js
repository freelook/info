'use strict';

angular
  .module('fli.home',
  ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'home.ctrl'
      });

  });
