'use strict';

angular
  .module('freelook.info')
  .controller('SearchCtrl', function ($rootScope, $routeParams, $scope, Google) {

    $rootScope.route = $routeParams;
    $scope.search = {};

    if ($routeParams.input) {

      Google.search($routeParams.input, function (search) {
        $scope.search = search || {};
        console.log($scope.search);
      });
    }


  });
