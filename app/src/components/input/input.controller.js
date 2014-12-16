'use strict';
angular
  .module('freelook.info')
  .controller('InputCtrl', function ($rootScope, $scope) {
    $scope.submit = function (form) {
      if (form.data && form.data.$viewValue) {
        $rootScope.do(form.data.$viewValue);
      }
    };
  });
