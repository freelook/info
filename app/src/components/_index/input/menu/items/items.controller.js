'use strict';

angular
  .module('freelook.info')
  .controller('menu.items.ctrl',
  function ($rootScope, $scope, $window, $location) {

    var vm = this;

    $scope.menu = [];

    vm.back = function () {
      $window.history.back();
    };

    vm.forward = function () {
      $window.history.forward();
    };

    vm.hide = function () {
      $rootScope.fli.focus = 0;
    };

    if ($location.path() !== '/') {
      $scope.menu.push({
        name: 'Home',
        icon: 'th-large',
        href: '/'
      })
    }

  });
