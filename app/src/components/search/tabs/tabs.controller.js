'use strict';
angular
  .module('fli.search')
  .controller('search.tabs.ctrl',
  function ($scope, CONFIG) {

    var TYPES = {
      goods: 1,
      image: 2
    };

    var vm = this;
    vm.selected = 0;

    vm.href = function (type) {
      var href = CONFIG.ORIGIN + 'search?input=' + $scope.fli.route.input;
      if (type) {
        href += '&type=' + type;
      }
      return href;
    };

    function init() {
      var type = $scope.fli.route.type || 0;
      vm.selected = TYPES[type] || 0;
    }

    init();

  });
