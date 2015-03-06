'use strict';

angular
  .module('freelook.info')
  .controller('index.ctrl', function ($rootScope, $route, $location) {

    $rootScope.fli = {};

    $rootScope.go = function (params) {
      switch (typeof params) {
        case 'string':
          $location.url(params);
          break;
        case 'object':
          $route.updateParams(params);
          break;
      }
    };

  });

