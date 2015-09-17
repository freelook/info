'use strict';
angular
  .module('fli.home')
  .controller('home.tabs.ctrl',
  function ($scope, url, locale) {

    var TYPES = {
      trends: 1,
      looks: 2
    };

    var vm = this, auto = false;
    vm.selected = 0;

    vm.href = function (type) {
      return url.href('?', {l: locale.getCode(), type: type});
    };

    vm.go = function (config) {
      if (!auto) {
        $scope.go(config);
      } else {
        auto = false;
      }
    };

    function init() {
      var type = $scope.fli.route.type || '';
      auto = true;
      vm.selected = !!type ? TYPES[type] : 0;
    }

    init();

  });
