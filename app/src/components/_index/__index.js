'use strict';

angular
  .module('freelook.info',
  ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial', 'mediaPlayer',
    'fli.home', 'fli.search', 'fli.look', 'fli.todo'])
  .config(function ($locationProvider, $httpProvider, $routeProvider, $mdThemingProvider) {

    // Setting hash prefix
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    // Set up cache
    $httpProvider.defaults.cache = true;

    $httpProvider.interceptors.push('LoaderInterceptor');

    // Setting theme
    $mdThemingProvider.theme('default').primaryPalette('indigo');

    // Routes config
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

  })
  .run(function (analytics) {
    analytics.init();
  });
