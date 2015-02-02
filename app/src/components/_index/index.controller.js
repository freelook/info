'use strict';

angular
  .module('freelook.info')
  .controller('IndexCtrl', function ($rootScope, $route, io) {

    $rootScope.fli = {};

    $rootScope.go = function (params) {
      $route.updateParams(params);
    };

    io.on('news', function(data) {
      console.log(data);
    });

  });

