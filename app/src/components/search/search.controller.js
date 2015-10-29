'use strict';

angular
  .module('freelook.info')
  .controller('search.ctrl',
  function ($rootScope, $routeParams, $location, $translate, index, locale) {

    if (!$routeParams.input) {
      $location.search({}).path('/').replace();
    } else {
      $location.search({
        l: locale.init($routeParams.l),
        input: $routeParams.input,
        type: $routeParams.type || 'web',
        sub: $routeParams.sub
      })
        .replace();
    }

    $translate.use(locale.getLng());
    $rootScope.fli.icon = 'search';
    index.init();

  });
