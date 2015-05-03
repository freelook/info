'use strict';

angular
  .module('fli.search',
  ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial'])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/search', {
        templateUrl: 'components/search/search.html',
        controller: 'search.ctrl'
      });

  })
  .constant('SEARCH_KEY', 'FLI:SEARCH');
