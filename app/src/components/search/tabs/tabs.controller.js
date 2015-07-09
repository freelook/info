'use strict';
angular
  .module('fli.search')
  .controller('search.tabs.ctrl',
  function ($scope, CONFIG) {

    var TYPES = {
      goods: 1,
      image: 2,
      audio: 3
    };

    var vm = this, auto = false;
    vm.selected = 0;

    vm.href = function (type) {
      var href = CONFIG.ORIGIN + 'search?input=' + $scope.fli.route.input;
      if (type) {
        href += '&type=' + type;
      }
      return href;
    };

    vm.go = function (config) {
      if (!auto) {
        $scope.go(config);
      } else {
        auto = false;
      }
    };

    function init() {
      var type = $scope.fli.route.type || 0;
      auto = true;
      vm.selected = TYPES[type] || 0;
    }

    init();

  });
