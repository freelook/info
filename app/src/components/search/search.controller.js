'use strict';

angular
  .module('freelook.info')
  .controller('search.ctrl',
  function ($rootScope, $routeParams, $location, $mdMedia,
            DEFAULT_TITLE, DEFAULT_DESCRIPTION) {

    $location.search({
      input: $routeParams.input || '',
      type: $routeParams.type,
      sub: $routeParams.sub,
      metaimg: $routeParams.metaimg,
      metatext: $routeParams.metatext
    })
      .replace();

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$rootScope.fli.route.input ? DEFAULT_TITLE : 'FLI - ' + decodeURIComponent($rootScope.fli.route.input);
    $rootScope.fli.description = !$rootScope.fli.route.input ? DEFAULT_DESCRIPTION : 'FLI - free look at ' + decodeURIComponent($rootScope.fli.route.input);
    $rootScope.fli.icon = 'search';
  });
