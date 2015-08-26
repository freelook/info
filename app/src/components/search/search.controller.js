'use strict';

angular
  .module('freelook.info')
  .controller('search.ctrl',
  function ($rootScope, $routeParams, $location, $mdMedia, $translate, locale,
            DEFAULT_TITLE, DEFAULT_DESCRIPTION) {

    $location.search({
      input: $routeParams.input || '',
      type: $routeParams.type,
      sub: $routeParams.sub,
      lng: locale.init($routeParams.lng)
    })
      .replace();

    $translate.use(locale.get());

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$routeParams.input ? DEFAULT_TITLE : 'FLI - ' + decodeURIComponent($routeParams.input);
    $rootScope.fli.description = !$routeParams.input ? DEFAULT_DESCRIPTION : 'FLI - free look at ' + decodeURIComponent($routeParams.input);
    $rootScope.fli.icon = 'search';
    $rootScope.fli.view = '';
  });
