'use strict';

angular
  .module('fli.look')
  .controller('look.ctrl',
  function ($rootScope, $routeParams, $location, $mdMedia, DEFAULT_TITLE, DEFAULT_DESCRIPTION,
            local, LOOK_KEY) {

    $location.search({
      input: $routeParams.input,
      url: $routeParams.url || '',
      metaimg: $routeParams.metaimg,
      metatext: $routeParams.metatext
    })
      .replace();

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$rootScope.fli.route.input ? DEFAULT_TITLE : 'FLI - ' + decodeURIComponent($rootScope.fli.route.input);
    $rootScope.fli.description = DEFAULT_DESCRIPTION;

    if (!!$rootScope.fli.route.input && !!$rootScope.fli.route.url) {
      local.push(LOOK_KEY, {
        input: $rootScope.fli.route.input,
        url: $rootScope.fli.route.url
      }, 10);
    }

  });
