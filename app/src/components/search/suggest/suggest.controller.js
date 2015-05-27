'use strict';
angular
  .module('fli.search')
  .controller('search.suggest.ctrl',
  function ($scope, google, trends) {

    $scope.suggested = [];

    function showTrends() {
      trends().then(function (trends) {
        $scope.suggested = trends || '';
      });
    }

    if ($scope.fli.route.input) {
      google.autocomplete($scope.fli.route.input)
        .success(function (auto) {
          var suggested = auto[1] || [];
          if (!!suggested.length) {
            $scope.suggested = suggested;
          } else {
            showTrends();
          }
        })
        .error(showTrends);
    } else {
      showTrends();
    }

  });
