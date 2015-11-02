'use strict';

angular
  .module('fli.show', [])
  .config(function ($routeProvider) {
    // Routes config
    $routeProvider
      .when('/show', {
        templateUrl: 'components/show/show.html',
        controller: 'show.ctrl'
      });
  });

