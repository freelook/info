'use strict';
angular
  .module('fli.search')
  .controller('search.chips.type.ctrl',
  function ($scope, $location, $translate, url, locale) {

    var vm = this;
    vm.types = [
      {type: 'web'},
      {type: 'people'},
      {type: 'news'},
      {type: 'goods'},
      {type: 'images'},
      {type: 'audio'},
      {type: 'video'},
      {type: 'promo'}
    ];

    function _init() {
      if ($scope.chips && $scope.fli.route.type) {
        $scope.chips.items.push({
          name: $translate.instant('search.tabs.' + $scope.fli.route.type),
          key: 'type',
          route: {
            type: null,
            sub: null
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
      return url.href('search?', _config(type));
    };

    vm.go = function (type) {
      $scope.go({type: type});
    };

    _init();

  });