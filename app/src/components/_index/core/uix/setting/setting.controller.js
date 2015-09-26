'use strict';

angular
  .module('freelook.info')
  .controller('setting.ctrl',
  function ($scope) {

    var vm = this;

    vm.close = function () {
      $scope.fli.view = '';
    };
  });

