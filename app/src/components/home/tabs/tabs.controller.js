'use strict';
angular
  .module('fli.home')
  .controller('home.tabs.ctrl',
  function ($scope, url) {

    var TYPES = {
      looks: 1
    };

    var vm = this, auto = false;
    vm.selected = 0;

    vm.href = function (type) {
      return url.href('/?', {type: type});
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
