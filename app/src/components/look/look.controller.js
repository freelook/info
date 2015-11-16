'use strict';

angular
  .module('fli.look')
  .controller('look.ctrl',
  function ($rootScope, $routeParams, $location, $translate, index, storage, locale, LOOK_KEY) {

    $location.search({
      l: locale.init($routeParams.l),
      input: $routeParams.input,
      type: $routeParams.type || null,
      url: $routeParams.url || '',
      img: $routeParams.img || null
    })
      .hash('')
      .replace();

    $translate.use(locale.getLng());
    $rootScope.fli.icon = 'eye';
    index.init();

    if ($routeParams.input && $routeParams.url && $routeParams.img) {
      storage.arr.push(LOOK_KEY, {
        input: $routeParams.input,
        type: $routeParams.type,
        url: $routeParams.url,
        img: $routeParams.img
      }, 12);
    }

  });
