'use strict';

angular
  .module('fli.about', [])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/about', {
        templateUrl: 'components/about/about.html',
        controller: 'about.ctrl',
        controllerAs: 'about'
      });

  });

