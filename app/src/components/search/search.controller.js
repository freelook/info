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
    $rootScope.fli.title = !$routeParams.input ? DEFAULT_TITLE : 'FLI - ' + decodeURIComponent($routeParams.input);
    $rootScope.fli.description = !$routeParams.input ? DEFAULT_DESCRIPTION : 'FLI - free look at ' + decodeURIComponent($routeParams.input);
    $rootScope.fli.icon = 'search';
  });
