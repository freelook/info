'use strict';

angular
  .module('fli.home')
  .controller('home.ctrl',
  function ($rootScope, $routeParams, $scope, $mdMedia, DEFAULT_TITLE, DEFAULT_DESCRIPTION, local, SEARCH_KEY, LOOK_KEY) {

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$rootScope.fli.route.input ? DEFAULT_TITLE : 'FLI - ' + decodeURIComponent($rootScope.fli.route.input);
    $rootScope.fli.description = DEFAULT_DESCRIPTION;

    $scope.searchs = local.get(SEARCH_KEY, []);
    $scope.looks = local.get(LOOK_KEY, []);

    $scope.widgets = [
      {
        name: 'Search',
        items: $scope.searchs,
        href: function (i) {
          return 'search?input=' + i.input;
        }
      },
      {
        name: 'Look',
        items: $scope.looks,
        href: function (i) {
          return 'look?input=' + i.input + '&url=' + i.url;
        }
      }
    ];

  });
