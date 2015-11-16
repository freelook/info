'use strict';

angular
  .module('fli.home')
  .controller('home.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $translate, index, locale) {

    $location.search({
      l: locale.init($routeParams.l),
      type: $routeParams.type
    })
      .hash('')
      .replace();

    $translate.use(locale.getLng());
    $rootScope.fli.icon = 'th-large';
    index.init();

  });
