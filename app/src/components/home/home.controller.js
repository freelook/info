'use strict';

angular
  .module('fli.home')
  .controller('home.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $mdMedia, local, url, DEFAULT_TITLE, DEFAULT_DESCRIPTION, LOOK_KEY) {

    $location.search({
      type: $routeParams.type,
      metaimg: $routeParams.metaimg,
      metatext: $routeParams.metatext
    })
      .replace();

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$rootScope.fli.route.input ? DEFAULT_TITLE : 'FLI - ' + decodeURIComponent($rootScope.fli.route.input);
    $rootScope.fli.description = DEFAULT_DESCRIPTION;
    $rootScope.fli.icon = 'th-large';

    $scope.looks = local.get(LOOK_KEY, []);

    $scope.widgets = [
      {
        name: 'Look',
        items: $scope.looks,
        href: function (i) {
          return url.href('look?', {input: i.input, url: i.url});
        }
      }
    ];

  });
