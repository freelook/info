'use strict';

angular
  .module('fli.company')
  .controller('company.ctrl',
  function ($rootScope, $location, $routeParams, $scope, $mdMedia, DEFAULT_TITLE, DEFAULT_DESCRIPTION) {

    $location.search({}).replace();

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = DEFAULT_TITLE;
    $rootScope.fli.description = DEFAULT_DESCRIPTION;
    $rootScope.fli.icon = 'heartbeat';

  });
