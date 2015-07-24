'use strict';

angular
  .module('fli.look')
  .controller('look.ctrl',
  function ($scope, $rootScope, $routeParams, $location, $mdMedia, local,
            DEFAULT_TITLE, DEFAULT_DESCRIPTION, LOOK_KEY) {

    $location.search({
      input: $routeParams.input,
      type: $routeParams.type,
      url: $routeParams.url || '',
      img: $routeParams.img,
      text: $routeParams.text,
      metaimg: $routeParams.metaimg,
      metatext: $routeParams.metatext
    })
      .replace();

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$routeParams.input ? DEFAULT_TITLE : 'FLI - ' + decodeURIComponent($routeParams.input);
    $rootScope.fli.description = DEFAULT_DESCRIPTION;
    $rootScope.fli.icon = 'eye';


    if ($routeParams.input && $routeParams.url && $routeParams.img && $routeParams.text) {
      local.arr.push(LOOK_KEY, {
        input: $routeParams.input,
        url: $routeParams.url,
        img: $routeParams.img,
        text: $routeParams.text
      }, 12);
    }

  });
