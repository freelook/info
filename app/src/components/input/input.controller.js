'use strict';
angular
  .module('freelook.info')
  .controller('InputCtrl',
  function ($rootScope, $scope, $timeout) {

    var tm = null;

    $rootScope.$watch('route.input', function (newValue) {

      if (newValue) {
        $timeout.cancel(tm);
        tm = $timeout(function () {
          $rootScope.go({input: newValue});
        }, 777);
      }

    });

  });
