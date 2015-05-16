'use strict';

angular
  .module('freelook.info')
  .controller('menu.items.ctrl',
  function ($rootScope, $scope, $window) {

    $scope.menu = [
      {
        name: 'Back',
        icon: 'arrow-left',
        href: '/',
        action: function () {
          $window.history.back();
        }
      },
      {
        name: 'Home',
        icon: 'th-large',
        href: '/'
      },
      {
        name: 'Hide',
        icon: 'arrow-up'
      }
    ];

  });
