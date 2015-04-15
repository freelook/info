'use strict';

angular
  .module('fli.menu')
  .controller('menu.ctrl',
  function ($rootScope, $routeParams, $scope, $mdMedia) {

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;

    $scope.menu = [
      {
        name: 'Home',
        icon: 'home',
        href: '/'
      },
      {
        name: 'Search',
        icon: 'search',
        href: '/search'
      },
      {
        name: 'Add',
        icon: 'plus'
      }
    ];

  });
