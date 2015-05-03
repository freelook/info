'use strict';

angular
  .module('fli.menu')
  .controller('menu.items.ctrl',
  function ($scope) {

    $scope.menu = [
      {
        name: 'Home',
        icon: 'th-large',
        href: '/'
      },
      {
        name: 'Search',
        icon: 'search',
        href: '/search'
      },
      {
        name: 'Add',
        icon: 'plus'
      }
    ];

  });
