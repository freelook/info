'use strict';

angular
  .module('fli.home')
  .controller('home.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $translate, index, locale) {

    $location.search({
      l: locale.init($routeParams.l),
      input: $routeParams.input,
      type: $routeParams.type,
      sub: $routeParams.sub,
      url: $routeParams.url,
      img: $routeParams.img
    })
      .hash('')
      .replace();

    $translate.use(locale.getLng());
    $rootScope.fli.icon = 'th-large';
    index.init();

  });
