'use strict';

angular
  .module('fli.look')
  .controller('look.ctrl',
  function ($rootScope, $routeParams, $location, $mdMedia, $translate, local, locale,
            I18N, LOOK_KEY) {

    $location.search({
      input: $routeParams.input,
      type: $routeParams.type,
      url: $routeParams.url || '',
      img: $routeParams.img,
      text: $routeParams.text,
      lng: locale.init($routeParams.lng)
    })
      .replace();

    $translate.use(locale.get());

    $rootScope.fli.route = $routeParams || {};
    $rootScope.fli.media = $mdMedia;
    $rootScope.fli.title = !$routeParams.input ? $translate.instant(I18N.DEFAULT_TITLE) : 'FLI - ' + decodeURIComponent($routeParams.input);
    $rootScope.fli.description = !!$routeParams.text ? decodeURIComponent($routeParams.text) : !$routeParams.input ? $translate.instant(I18N.DEFAULT_DESCRIPTION) : $translate.instant(I18N.CUSTOM_DESCRIPTION) + decodeURIComponent($routeParams.input);
    $rootScope.fli.icon = 'eye';
    $rootScope.fli.view = '';


    if ($routeParams.input && $routeParams.url && $routeParams.img && $routeParams.text) {
      local.arr.push(LOOK_KEY, {
        input: $routeParams.input,
        url: $routeParams.url,
        img: $routeParams.img,
        text: $routeParams.text
      }, 12);
    }

  });
