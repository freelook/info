'use strict';

angular
  .module('fli.home')
  .controller('home.chips.ctrl',
  function ($scope) {

    var vm = this;
    vm.items = [];

    vm.remove = function (chip) {
      $scope.go(chip.route);
    };

  });
