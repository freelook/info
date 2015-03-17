'use strict';

angular
  .module('fli.look')
  .controller('look.ctrl', function ($rootScope, $routeParams, $location, local, LOOK_KEY) {

    $location.search({
      url: $routeParams.url,
      input: $routeParams.input
    });

    $rootScope.fli.route = $routeParams || {};


    if (!!$rootScope.fli.route.input && !!$rootScope.fli.route.url) {
      local.push(LOOK_KEY, {
        input: $rootScope.fli.route.input,
        url: $rootScope.fli.route.url
      }, 10);
    }

  });
