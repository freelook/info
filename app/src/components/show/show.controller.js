'use strict';

angular
  .module('fli.show')
  .controller('show.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $translate, index, locale) {

    $location.search({
      l: locale.init($routeParams.l)
    })
      .replace();

    $translate.use(locale.getLng());
    $rootScope.fli.icon = 'plus';
    index.init();

  });

