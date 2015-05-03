'use strict';

angular
  .module('fli.menu')
  .controller('menu.ctrl',
  function ($rootScope, $routeParams, $scope, $mdMedia, DEFAULT_TITLE, DEFAULT_DESCRIPTION) {

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$rootScope.fli.route.input ? DEFAULT_TITLE : 'FLI - ' + $rootScope.fli.route.input;
    $rootScope.fli.description = DEFAULT_DESCRIPTION;

  });
