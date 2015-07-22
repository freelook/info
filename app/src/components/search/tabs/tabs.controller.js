'use strict';
angular
  .module('fli.search')
  .controller('search.tabs.ctrl',
  function ($scope, url) {

    var TYPES = {
      news: 1,
      goods: 2,
      image: 3,
      audio: 4
    };

    var vm = this, auto = false;
    vm.selected = 0;

    vm.href = function (type) {
      return url.href('search?', {input: $scope.fli.route.input, type: type});
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
