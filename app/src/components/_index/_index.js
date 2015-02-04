'use strict';

angular
  .module('freelook.info',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial', 'fli.search'])
  .config(function ($locationProvider, $httpProvider) {

    // Setting hash prefix
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

    // Set up cache
    $httpProvider.defaults.cache = true;

    $httpProvider.interceptors.push('LoaderInterceptor');


  })
  .run(function () {



  });
