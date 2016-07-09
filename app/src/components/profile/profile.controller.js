'use strict';

angular
  .module('fli.profile')
  .controller('profile.ctrl',
  function ($rootScope, $routeParams, $location, $scope, $translate, index, locale) {

    $location.search({
      l: locale.init($routeParams.l)
    })
      .replace();

    $translate.use(locale.getLng());
    $rootScope.fli.icon = 'user';
    index.init();

  });
