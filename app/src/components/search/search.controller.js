'use strict';

angular
  .module('freelook.info')
  .controller('search.ctrl',
  function ($rootScope, $routeParams, $location, local, SEARCH_KEY) {

    $location.search({
      input: $routeParams.input || ''
    });

    $rootScope.fli.route = $routeParams || {};

    if (!!$rootScope.fli.route.input) {
      local.push(SEARCH_KEY, {
        input: $rootScope.fli.route.input
      }, 10);
    }

  });
