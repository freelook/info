'use strict';

angular
  .module('fli.look')
  .controller('LookCtrl', function ($rootScope, $routeParams) {

    $rootScope.fli.route = $routeParams || {};

    if (!$rootScope.fli.route.type) {
      $rootScope.go({type: 'full'});
    }

  });
