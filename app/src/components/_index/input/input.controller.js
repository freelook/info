(function () {
  'use strict';

  window.i18n.en.index.input = {};
  window.i18n.ru.index.input = {};

  angular
    .module('freelook.info')
    .controller('input.ctrl',
    function ($scope, $mdBottomSheet, $location, url, PLACEHOLDER_KEY) {

      var vm = this;
      vm.placeholder = PLACEHOLDER_KEY;
      $scope.fli.focus = 0;

      vm.find = function () {
        if ($scope.fli.route.input) {
          if ($location.path() === '/search') {
            $scope.go({input: $scope.fli.route.input});
          } else {
            $scope.go('search?input=' + $scope.fli.route.input);
          }
        }
      };

      vm.clear = function () {
        $scope.fli.route.input = '';
      };

      vm.href = function () {
        if (!$scope.fli.focus) {
          return url.href($location.url().slice(1));
        }
        if ($scope.fli.route.input) {
          return url.href('search?', {input: $scope.fli.route.input}, true);
        }
        return '/';
      };

      vm.focus = function () {
        $scope.fli.focus = 1;
      };

    })
    .constant('PLACEHOLDER_KEY', 'index.input.placeholder');

}());
