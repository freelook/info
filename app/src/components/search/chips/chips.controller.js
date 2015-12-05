'use strict';

angular
  .module('fli.search')
  .controller('search.chips.ctrl',
  function ($scope) {

    var vm = this;
    vm.items = [];

    vm.remove = function (chip) {
      $scope.go(chip.route);
    };

  });
