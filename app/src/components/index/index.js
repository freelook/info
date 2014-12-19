'use strict';

angular
  .module('freelook.info',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .config(function ($routeProvider, $locationProvider) {

    // Setting hash prefix
    $locationProvider.hashPrefix('!');

    // Routes config
    $routeProvider
      .when('/search/google', {
        templateUrl: 'components/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/search/google'
      });
  });
