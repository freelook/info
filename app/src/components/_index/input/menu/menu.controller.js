'use strict';

angular
  .module('freelook.info')
  .controller('input.menu.ctrl',
  function ($rootScope, $scope, $location, locale, url) {

    var vm = this;

    vm.items = [];
    vm.path = $location.path();

    vm.hide = function () {
      $scope.fli.focus = 0;
      $scope.fli.view = '';
    };

    vm.items.push({
      name: 'index.input.menu.add',
      icon: 'plus',
      href: url.href('show?', {l: locale.getCode()}),
      path: '/show'
    });

  });
