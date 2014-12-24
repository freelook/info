'use strict';

angular
  .module('freelook.info')
  .controller('IndexCtrl', function ($rootScope, $route) {

    $rootScope.fli = {};

    $rootScope.go = function (params) {
      $route.updateParams(params);
    };

  });

