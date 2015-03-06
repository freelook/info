'use strict';

angular
  .module('fli.look')
  .controller('look.ctrl', function ($rootScope, $routeParams, $location) {

    $location.search({
      url: $routeParams.url,
      input: $routeParams.input
    });

    $rootScope.fli.route = $routeParams || {};

  });
