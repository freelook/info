'use strict';

angular
  .module('fli.company', [])
  .config(function ($routeProvider) {

    // Routes config
    $routeProvider
      .when('/company', {
        templateUrl: 'components/company/company.html',
        controller: 'company.ctrl',
        controllerAs: 'company'
      });

  });

