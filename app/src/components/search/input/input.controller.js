'use strict';
angular
  .module('fli.search')
  .controller('InputCtrl',
  function ($scope, DEFAULT_PLACEHOLDER) {

    function init() {
      $scope.setPlaceholder();
    }

    $scope.setPlaceholder = function () {
      $scope.placeholder = DEFAULT_PLACEHOLDER;
    };

    $scope.search = function () {
        $scope.go({input: $scope.fli.route.input});
    };

    $scope.clear = function () {
      $scope.fli.route.input = '';
    };

    init();

  });
