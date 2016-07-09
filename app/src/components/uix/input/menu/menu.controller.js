'use strict';

angular
  .module('freelook.info')
  .controller('input.menu.ctrl',
  function (nav) {

    var vm = this;

    vm.items = [
      {
        name: 'index.input.menu.filter',
        icon: 'filter',
        go: nav.goHome,
        action: 'filter'
      },
      {
        name: 'index.input.menu.user',
        icon: 'user',
        go: nav.goProfile,
        action: 'user'
      },
      {
        name: 'index.input.menu.add',
        icon: 'plus',
        go: nav.goAdd,
        action: 'add'
      }
    ];

  });
