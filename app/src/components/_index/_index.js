'use strict';

angular
  .module('freelook.info',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .config(function ($routeProvider, $locationProvider) {

    // Setting hash prefix
    $locationProvider.hashPrefix('!');

    // Routes config
    $routeProvider
      .when('/search', {
        templateUrl: 'components/search/search.html',
        controller: 'SearchCtrl'
      })
      .otherwise({
        redirectTo: '/search'
      });
  });
