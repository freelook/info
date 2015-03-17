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
      });

  })
  .constant('SEARCH_KEY', 'LOCAL:SEARCH');
