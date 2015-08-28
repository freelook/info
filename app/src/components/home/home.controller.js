'use strict';

angular
  .module('fli.home')
  .controller('home.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $translate, $mdMedia,
            local, locale, url, I18N, LOOK_KEY) {

    $location.search({
      type: $routeParams.type,
      l: locale.init($routeParams.l)
    })
      .replace();

    $translate.use(locale.getLng());

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$routeParams.input ? $translate.instant(I18N.DEFAULT_TITLE) : 'FLI - ' + decodeURIComponent($routeParams.input);
    $rootScope.fli.description = $translate.instant(I18N.DEFAULT_DESCRIPTION);
    $rootScope.fli.icon = 'th-large';
    $rootScope.fli.view = '';

    $scope.looks = local.get(LOOK_KEY, []);

  });
