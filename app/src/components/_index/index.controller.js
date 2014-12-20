'use strict';

angular
  .module('freelook.info')
  .controller('IndexCtrl', function ($rootScope, $route) {

    $rootScope.route = {};

    $rootScope.go = function (params) {
      $route.updateParams(params);
    };

  });

