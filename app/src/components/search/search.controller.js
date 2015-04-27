'use strict';

angular
  .module('freelook.info')
  .controller('search.ctrl',
  function ($rootScope, $routeParams, $location, $mdMedia, DEFAULT_TITLE, DEFAULT_DESCRIPTION, local, SEARCH_KEY) {

    $location.search({
      input: $routeParams.input || '',
      url: $routeParams.url || ''
    })
      .replace();

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$rootScope.fli.route.input ? DEFAULT_TITLE : 'FLI - ' + $rootScope.fli.route.input;
    $rootScope.fli.description = !$rootScope.fli.route.input ? DEFAULT_DESCRIPTION : 'FLI - free look at ' + $rootScope.fli.route.input;

    if (!!$rootScope.fli.route.input) {
      local.push(SEARCH_KEY, {
        input: $rootScope.fli.route.input
      }, 10);
    }

  });
