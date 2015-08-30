'use strict';

angular
  .module('fli.look')
  .controller('look.ctrl',
  function ($rootScope, $routeParams, $location, $mdMedia, $translate, local, locale,
            I18N, LOOK_KEY) {

    $location.search({
      input: $routeParams.input,
      type: $routeParams.type || null,
      url: $routeParams.url || '',
      img: $routeParams.img || null,
      l: locale.init($routeParams.l)
    })
      .replace();

    $translate.use(locale.getLng());

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$routeParams.input ? $translate.instant(I18N.DEFAULT_TITLE) : 'FLI - ' + decodeURIComponent($routeParams.input);
    $rootScope.fli.description = !$routeParams.input ? $translate.instant(I18N.DEFAULT_DESCRIPTION) : $translate.instant(I18N.CUSTOM_DESCRIPTION) + decodeURIComponent($routeParams.input);
    $rootScope.fli.icon = 'eye';
    $rootScope.fli.view = '';


    if ($routeParams.input && $routeParams.url && $routeParams.img) {
      local.arr.push(LOOK_KEY, {
        input: $routeParams.input,
        url: $routeParams.url,
        img: $routeParams.img
      }, 12);
    }

  });
