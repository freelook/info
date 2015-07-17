'use strict';

angular
  .module('fli.search', [])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/search', {
        templateUrl: 'components/search/search.html',
        controller: 'search.ctrl'
      });

  });
