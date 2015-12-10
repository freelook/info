'use strict';

angular
  .module('fli.look')
  .controller('look.chips.ctrl',
  function ($scope, $translate, url, content, locale) {

    var vm = this,
      site = content.site($scope.fli.route.url);

    vm.remove = function (chip) {
      $scope.go(chip.route);
    };

    vm.items = [
      {
        name: $translate.instant('search.tabs.' + $scope.fli.route.type || 'web'),
        key: 'type',
        route: url.href('search?', {
          l: locale.getCode(),
          input: $scope.fli.route.input
        }, false, '/')
      },
      {
        name: site.host,
        key: 'sub',
        route: url.href('search?', {
          l: locale.getCode(),
          input: $scope.fli.route.input,
          type: $scope.fli.route.type,
          sub: $scope.fli.route.sub
        }, false, '/')
      }
    ];

  });
