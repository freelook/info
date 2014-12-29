'use strict';
angular
  .module('freelook.info')
  .controller('InputCtrl',
  function ($rootScope, $scope, $timeout) {

    var DEFAULT_LABEL = 'FREE LOOK AT INFO';

    $scope.timer = null;

    $scope.label = DEFAULT_LABEL;

    $scope.setLabel = function( value ) {
      $scope.label = !value ? DEFAULT_LABEL : 'FREE LOOK AT';
    };


    $rootScope.$watch('fli.route.input', function (newValue) {

      $scope.setLabel(newValue);

      if (!angular.isUndefined(newValue)) {
        $timeout.cancel($scope.timer);
        $scope.timer = $timeout(function () {
          $rootScope.go({input: newValue});
        }, 777);
      }

    });

  });
