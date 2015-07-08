'use strict';

angular
  .module('fli.home', [])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/', {
        templateUrl: 'components/home/home.html',
        controller: 'home.ctrl'
      });

  });
