'use strict';

angular
  .module('fli.look')
  .controller('LookCtrl', function ($rootScope, $routeParams, $sce, $scope) {

    $rootScope.fli.route = $routeParams || {};

    if (!$rootScope.fli.route.type) {
      $rootScope.go({type: 'full'});
    }
    $scope.url = $sce.trustAsResourceUrl($rootScope.fli.route.url);

  });
