'use strict';

angular
  .module('freelook.info')
  .controller('SearchCtrl',
  function ($rootScope, $routeParams, $location) {

    $location.search({
      from: $routeParams.from || 'google',
      input: $routeParams.input || ''
    });

    $rootScope.fli.route = $routeParams || {};

  });
