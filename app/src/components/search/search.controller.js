'use strict';

angular
  .module('freelook.info')
  .controller('search.ctrl',
  function ($rootScope, $routeParams, $location, $mdMedia, $translate, locale, I18N) {

    $location.search({
      l: locale.init($routeParams.l),
      input: $routeParams.input || '',
      type: $routeParams.type,
      sub: $routeParams.sub
    })
      .replace();

    $translate.use(locale.getLng());

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$routeParams.input ? $translate.instant(I18N.DEFAULT_TITLE) : 'FLI - ' + decodeURIComponent($routeParams.input);
    $rootScope.fli.description = !$routeParams.input ? $translate.instant(I18N.DEFAULT_DESCRIPTION) : $translate.instant(I18N.CUSTOM_DESCRIPTION) + decodeURIComponent($routeParams.input);
    $rootScope.fli.icon = 'search';
    $rootScope.fli.view = '';
  });
