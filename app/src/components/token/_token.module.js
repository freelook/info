'use strict';

angular
  .module('fli.token', [])
  .config(function ($routeProvider) {
    // Routes config
    $routeProvider
      .when('/token', {
        template: '<fli-logo></fli-logo>',
        controller: 'token.ctrl'
      });
  });

