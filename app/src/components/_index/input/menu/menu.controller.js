'use strict';

angular
  .module('freelook.info')
  .controller('input.menu.ctrl',
  function ($rootScope, $scope, $window, $location, locale, url) {

    var vm = this;

    $scope.menu = [];
    vm.url = $location.absUrl();

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
      icon: 'eye-slash',
      href: url.href('?', {l: locale.getCode()})
    }, {
      name: 'index.input.menu.add',
      icon: 'plus',
      href: url.href('show?', {l: locale.getCode()})
    });

  });
