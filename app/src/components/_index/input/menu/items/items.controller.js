'use strict';

angular
  .module('freelook.info')
  .controller('menu.items.ctrl',
  function ($rootScope, $scope, $window) {

    var vm = this;

    vm.back = function () {
      $window.history.back();
    };

    vm.forward = function () {
      $window.history.forward();
    };

    vm.hide = function () {
      $rootScope.fli.focus = 0;
    };

    $scope.menu = [
      {
        name: 'Home',
        icon: 'th-large',
        href: '/'
      }
    ];

  });
