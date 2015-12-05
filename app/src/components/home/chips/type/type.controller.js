'use strict';
angular
  .module('fli.home')
  .controller('home.chips.type.ctrl',
  function ($scope, $location, $translate, url, locale) {

    var vm = this;
    vm.types = [
      {type: 'news'},
      {type: 'web'},
      {type: 'promo'}
    ];

    function _init() {
      if ($scope.chips && $scope.fli.route.type) {
        $scope.chips.items.push({
          name: $translate.instant('home.tabs.' + $scope.fli.route.type),
          key: 'type',
          route: {
            type: null
          },
          click: function () {
          }
        });
      }
    }

    function _config(type) {
      return {
        l: locale.getCode(),
        input: $scope.fli.route.input,
        type: type
      };
    }

    vm.href = function (type) {
      return url.href('?', _config(type));
    };

    vm.go = function (type) {
      $scope.go({type: type});
    };

    _init();

  });
