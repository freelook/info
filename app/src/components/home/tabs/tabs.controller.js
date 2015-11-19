'use strict';
angular
  .module('fli.home')
  .controller('home.tabs.ctrl',
  function ($scope, url, locale) {

    var TYPES = {
      news: 0,
      web: 1,
      promo: 2
    };

    var vm = this;
    vm.selected = -1;

    function _config(type) {
      return {
        l: locale.getCode(),
        type: type
      };
    }

    vm.href = function (type) {
      return url.href('?', _config(type));
    };

    vm.go = function (type) {
      $scope.go(url.href('?', _config(type), false, '/'));
    };

    function init() {
      var type = TYPES[$scope.fli.route.type || ''];
      if (angular.isUndefined(type)) {
        vm.go(null);
      } else {
        vm.selected = type;
      }
    }

    init();

  });
