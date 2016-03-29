'use strict';

angular
  .module('fli.home')
  .controller('home.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $translate, index, locale) {

    $location.search({
      l: locale.init($routeParams.l),
      input: $routeParams.input || null,
      type: $routeParams.type || null,
      sub: $routeParams.sub || null,
      url: $routeParams.url || null,
      img: $routeParams.img || null
    })
      .hash('')
      .replace();

    $translate.use(locale.getLng());
    $rootScope.fli.icon = 'eye-slash';
    index.init();

  });
