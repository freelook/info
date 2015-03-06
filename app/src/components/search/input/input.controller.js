'use strict';
angular
  .module('fli.search')
  .controller('search.input.ctrl',
  function ($scope, DEFAULT_PLACEHOLDER) {

    function init() {
      $scope.setPlaceholder();
    }

    $scope.setPlaceholder = function () {
      $scope.placeholder = DEFAULT_PLACEHOLDER;
    };

    $scope.find = function () {
      $scope.go('search?input=' +$scope.fli.route.input);
    };

    $scope.clear = function () {
      $scope.fli.route.input = '';
    };

    init();

  });
