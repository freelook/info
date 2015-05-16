'use strict';
angular
  .module('fli.search')
  .controller('search.suggest.ctrl',
  function ($scope, google) {

    $scope.suggested = [];

    if ($scope.fli.route.input) {
      google.autocomplete($scope.fli.route.input).success(function (auto) {
        $scope.suggested = auto[1] || [];
      });
    }

  });
