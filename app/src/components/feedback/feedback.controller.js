'use strict';

angular
  .module('fli.feedback')
  .controller('feedback.ctrl',
    function ($rootScope, $routeParams, $location, $translate, index, locale) {

      $location.search({
          l: locale.init($routeParams.l),
          type: $routeParams.type
        })
        .hash('')
        .replace();

      $translate.use(locale.getLng());
      $rootScope.fli.icon = 'bullhorn';
      index.init();

    });
