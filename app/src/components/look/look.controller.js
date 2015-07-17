'use strict';

angular
  .module('fli.look')
  .controller('look.ctrl',
  function ($scope, $rootScope, $routeParams, $location, $mdMedia, local,
            DEFAULT_TITLE, DEFAULT_DESCRIPTION, LOOK_KEY) {

    $location.search({
      input: $routeParams.input,
      url: $routeParams.url || '',
      img: $routeParams.url,
      text: $routeParams.url,
      metaimg: $routeParams.metaimg,
      metatext: $routeParams.metatext
    })
      .replace();

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$rootScope.fli.route.input ? DEFAULT_TITLE : 'FLI - ' + decodeURIComponent($rootScope.fli.route.input);
    $rootScope.fli.description = DEFAULT_DESCRIPTION;
    $rootScope.fli.icon = 'eye';

    local.push(LOOK_KEY, {
      input: $rootScope.fli.route.input,
      url: $rootScope.fli.route.url,
      img: $rootScope.fli.route.img,
      text: $rootScope.fli.route.text
    }, 12);

  });
