'use strict';

angular
  .module('freelook.info',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial', 'fli.search'])
  .config(function ($locationProvider) {



    // Setting hash prefix
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

  })
  .run(function () {



  });
