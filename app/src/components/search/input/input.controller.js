'use strict';
angular
  .module('fli.search')
  .controller('InputCtrl',
  function ($scope, DEFAULT_LABEL) {

    function init() {
      $scope.setLabel();
    }

    $scope.setLabel = function () {
      $scope.label = DEFAULT_LABEL;
    };

    $scope.search = function () {
        $scope.go({input: $scope.fli.route.input});
    };

    $scope.clear = function () {
      $scope.fli.route.input = '';
    };

    init();

  });
