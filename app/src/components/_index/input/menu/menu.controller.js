'use strict';

angular
  .module('freelook.info')
  .controller('input.menu.ctrl',
  function ($rootScope, $scope, locale, url) {

    var vm = this;

    vm.hide = function () {
      $scope.fli.focus = 0;
      $scope.fli.view = '';
    };

    vm.items = [
      {
        name: 'index.input.menu.search',
        icon: 'search',
        href: url.href('?', {l: locale.getCode()}),
        action: 'search'
      },
      {
        name: 'index.input.menu.add',
        icon: 'plus',
        href: url.href('show?', {l: locale.getCode()}),
        action: 'add'
      }];

  });
