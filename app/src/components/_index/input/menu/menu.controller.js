'use strict';

angular
  .module('freelook.info')
  .controller('input.menu.ctrl',
  function ($rootScope, $scope, $window, $location, locale) {

    var vm = this;

    $scope.menu = [];
    vm.path = $location.path();

    vm.back = function () {
      $window.history.back();
    };

    vm.forward = function () {
      $window.history.forward();
    };

    vm.hide = function () {
      $rootScope.fli.focus = 0;
      $rootScope.fli.view = '';
      $scope.inptElement.blur();
    };

    $scope.menu.push({
      name: 'index.input.menu.home',
      icon: 'th-large',
      href: '/?l=' + locale.getCode()
    });

  });
