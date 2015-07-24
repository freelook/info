'use strict';
angular
  .module('fli.look')
  .controller('look.tabs.ctrl',
  function ($scope, $window, url) {

    var TYPES = {
      full: 1
    };

    var vm = this, auto = false;
    vm.selected = 0;

    vm.href = function (type) {
      return url.href('look?', {
        input: $scope.fli.route.input || null,
        type: type,
        url: $scope.fli.route.url
      });
    };

    vm.go = function (config, reload) {
      if (!auto) {
        if (!reload) {
          $scope.go(config);
        } else {
          $window.location.href = vm.href(config.type);
        }
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
