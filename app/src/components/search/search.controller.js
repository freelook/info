'use strict';

angular
  .module('freelook.info')
  .controller('search.ctrl',
  function ($rootScope, $routeParams, $location) {

    $location.search({
      input: $routeParams.input || ''
    });

    $rootScope.fli.route = $routeParams || {};

  });
