'use strict';

angular
  .module('fli.token', [])
  .config(function ($routeProvider) {
    // Routes config
    $routeProvider
      .when('/token', {
        templateUrl: 'components/token/token.html',
        controller: 'token.ctrl'
      });
  });

