'use strict';

angular
  .module('fli.token', [])
  .config(function ($routeProvider) {
    // Routes config
    $routeProvider
      .when('/token/chrome', {
        template: '<fli-logo></fli-logo>',
        controller: 'chrome.token.ctrl'
      });
  });

