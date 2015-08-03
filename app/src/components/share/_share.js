'use strict';

angular
  .module('fli.share', [])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/share', {
        templateUrl: 'components/share/share.html',
        controller: 'share.ctrl',
        controllerAs: 'share'
      });

  });

