'use strict';
angular
  .module('fli.home')
  .controller('home.tabs.ctrl',
  function ($scope, url, locale) {

    var TYPES = {
      looks: 0,
      news: 1,
      trends: 2
    };

    var vm = this, auto = false;
    vm.selected = -1;

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
      vm.selected = !!type ? TYPES[type] : -1;
    }

    init();

  });
