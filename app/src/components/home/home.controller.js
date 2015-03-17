'use strict';

angular
  .module('fli.home')
  .controller('home.ctrl',
  function ($rootScope, $routeParams, $scope, local, SEARCH_KEY, LOOK_KEY) {

    $rootScope.fli.route = $routeParams || {};

    $scope.searchs = local.get(SEARCH_KEY);
    console.log($scope.searchs);
    $scope.looks = local.get(LOOK_KEY);

  });
