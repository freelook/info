'use strict';

angular
  .module('fli.search')
  .controller('search.chips.ctrl',
  function ($scope, $translate) {

    var vm = this;

    vm.remove = function (chip) {
      var route = {};
      route[chip.key] = null;
      if (chip.key === 'type') {
        route['sub'] = null;
      }
      $scope.go(route);
    };

    vm.items = [];

    if ($scope.fli.route.type) {
      vm.items.push({
        name: $translate.instant('search.tabs.' + $scope.fli.route.type),
        key: 'type',
        click: function () {
        }
      });
      if ($scope.fli.route.sub) {
        vm.items.push({
          name: $scope.fli.route.sub,
          key: 'sub',
          click: function () {
          }
        });
      }
    }

  });
