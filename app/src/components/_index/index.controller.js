'use strict';

angular
  .module('freelook.info')
  .controller('IndexCtrl', function ($rootScope, $route, $location, io) {

    $rootScope.fli = {};

    $rootScope.go = function (params) {
      switch (typeof params) {
        case 'string':
          $location.path(params);
          break;
        case 'object':
          $route.updateParams(params);
          break;
      }
    };

    io.on('news', function (data) {
      console.log(data);
    });

  });

