'use strict';

angular
  .module('fli.search',
  ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/search', {
        templateUrl: 'components/search/search.html',
        controller: 'search.ctrl'
      })
      .otherwise({
        redirectTo: '/search'
      });
  })
  .constant('DEFAULT_PLACEHOLDER', 'looking for');
