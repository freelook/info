'use strict';

angular
  .module('fli.search',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .config(function ($routeProvider) {

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

