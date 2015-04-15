'use strict';

angular
  .module('fli.home')
  .controller('home.ctrl',
  function ($rootScope, $routeParams, $scope, $mdMedia,  local, SEARCH_KEY, LOOK_KEY) {

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;

    $scope.searchs = local.get(SEARCH_KEY);
    $scope.looks = local.get(LOOK_KEY);

  });
