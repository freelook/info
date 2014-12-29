'use strict';

angular
  .module('fli.search')
  .controller('GoogleCtrl',
  function ($rootScope, $scope, Google) {

    $scope.search = {};
    $scope.suggested = [];

    if ($rootScope.fli.route.input) {
      Google.search($rootScope.fli.route.input).success(function (search) {
        $scope.search = search || {};
        console.info($scope.search);
      });

    }

    Google.autocomplete($rootScope.fli.route.input || 'info').success(function (auto) {
      $scope.suggested = auto[1] || [];
    });


  });

