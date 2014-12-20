'use strict';
angular
  .module('freelook.info')
  .controller('InputCtrl',
  function ($rootScope, $scope, $timeout) {

    $scope.timer = null;

    $scope.getLabel = function() {
      return !$rootScope.route.input ? 'FREE LOOK AT INFO' : 'FREE LOOK AT';
    };


    $rootScope.$watch('route.input', function (newValue) {

      if (!angular.isUndefined(newValue)) {
        $timeout.cancel($scope.timer);
        $scope.timer = $timeout(function () {
          $rootScope.go({input: newValue});
        }, 777);
      }

    });

  });
