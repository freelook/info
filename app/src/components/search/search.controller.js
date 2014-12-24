'use strict';

angular
  .module('freelook.info')
  .controller('SearchCtrl',
  function ($rootScope, $routeParams) {

    $rootScope.fli.route = $routeParams;

    if (!$rootScope.fli.route.from) {
      $rootScope.go({from: 'google'});
    }

  });
