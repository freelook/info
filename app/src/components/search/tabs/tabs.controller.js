'use strict';
angular
  .module('fli.search')
  .controller('search.tabs.ctrl',
  function ($scope) {

    var TYPES = {
      image: 1
    };

    $scope.tabs = {
      selected: 0
    };

    function init() {
      var type = $scope.fli.route && $scope.fli.route.type || 0;
      $scope.tabs.selected = TYPES[type] || 0;
    }

    init();

  });
