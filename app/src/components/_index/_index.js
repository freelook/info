'use strict';

angular
  .module('freelook.info',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial', 'fli.search'])
  .config(function ($locationProvider) {

    // Setting hash prefix
    $locationProvider.hashPrefix('!');

  });
