'use strict';

angular
  .module('fli.home')
  .controller('home.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $translate, $mdMedia, locale, url, I18N) {

    $location.search({
      l: locale.init($routeParams.l),
      type: $routeParams.type
    })
      .replace();

    $translate.use(locale.getLng());

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$routeParams.input ? $translate.instant(I18N.DEFAULT_TITLE) : decodeURIComponent($routeParams.input) + $translate.instant(I18N.FLI_POSTFIX);
    $rootScope.fli.description = $translate.instant(I18N.DEFAULT_DESCRIPTION);
    $rootScope.fli.icon = 'th-large';
    $rootScope.fli.view = '';

  });
