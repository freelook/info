'use strict';

angular
  .module('freelook.info')
  .controller('input.menu.ctrl',
  function (locale, url) {

    var vm = this;

    vm.items = [
      {
        name: 'index.input.menu.filter',
        icon: 'filter',
        href: url.href('?', {l: locale.getCode()}),
        action: 'filter'
      },
      {
        name: 'index.input.menu.add',
        icon: 'plus',
        href: url.href('show?', {l: locale.getCode()}),
        action: 'add'
      }
    ];

  });
