'use strict';

angular
  .module('fli.look')
  .controller('look.chips.ctrl',
  function ($scope, $translate, nav, content) {

    var vm = this,
      site = content.site($scope.fli.route.url);

    vm.items = [
      {
        name: $translate.instant('search.tabs.' + $scope.fli.route.type || 'web'),
        click: function () {
          nav.path('search');
        }
      },
      {
        name: site.host,
        click: function () {
          $scope.fli.route.input = 'site:' + site.host;
        }
      }
    ];

  });
