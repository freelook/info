'use strict';

angular
  .module('freelook.info')
  .controller('search.ctrl',
  function ($rootScope, $routeParams, $location, $mdMedia, local, SEARCH_KEY) {

    $location.search({
      input: $routeParams.input || '',
      url: $routeParams.url || ''
    });

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;

    if (!!$rootScope.fli.route.input) {
      local.push(SEARCH_KEY, {
        input: $rootScope.fli.route.input
      }, 10);
    }

  });
