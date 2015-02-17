'use strict';

angular
  .module('freelook.info',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial', 'fli.search', 'fli.look'])
  .config(function ($locationProvider, $httpProvider, $mdThemingProvider) {

    // Setting hash prefix
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    // Set up cache
    $httpProvider.defaults.cache = true;

    $httpProvider.interceptors.push('LoaderInterceptor');

    // Setting theme
    $mdThemingProvider.theme('default').accentPalette('deep-purple');

  })
  .run(function () {


  });
