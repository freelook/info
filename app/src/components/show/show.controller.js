'use strict';

angular
  .module('fli.show')
  .controller('show.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $translate, index, locale) {

    $location.search({
      l: locale.init($routeParams.l),
      input: $routeParams.input
    })
      .replace();

    $translate.use(locale.getLng());
    $rootScope.fli.icon = 'plus';
    index.init();

    $rootScope.fli.route.url = $routeParams.input;

  });

