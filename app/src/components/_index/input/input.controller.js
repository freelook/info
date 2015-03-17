'use strict';
angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($scope, DEFAULT_PLACEHOLDER) {

    function init() {
      $scope.setPlaceholder();
    }

    $scope.setPlaceholder = function () {
      $scope.placeholder = DEFAULT_PLACEHOLDER;
    };

    $scope.find = function () {
      if($scope.fli.route.input) {
        $scope.go('search?input=' + $scope.fli.route.input);
      } else {
        $scope.go('/');
      }
    };

    $scope.clear = function () {
      $scope.fli.route.input = '';
    };

    init();

  })
  .constant('DEFAULT_PLACEHOLDER', 'Type what you want');
