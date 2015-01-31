'use strict';
angular
  .module('fli.search')
  .controller('InputCtrl',
  function ($scope, SPLIT_LABEL, DEFAULT_LABEL) {

    function init() {
      $scope.timer = null;
      $scope.setLabel();
    }

    $scope.setLabel = function () {
      $scope.label = $scope.fli.route.input ? SPLIT_LABEL : DEFAULT_LABEL;
    };

    $scope.search = function () {
        $scope.go({input: $scope.fli.route.input});
    };

    $scope.clear = function () {
      $scope.fli.route.input = '';
    };

    init();

  });
