'use strict';

angular
  .module('fli.search')
  .controller('search.result.ctrl',
  function ($scope, $mdMedia, google, yandex) {

    $scope.search = {};
    $scope.suggested = [];
    $scope.lucky = 'freedom';

    $scope.href = function (result) {
      if($mdMedia('gt-sm')) {
        return 'search?&input=' + $scope.fli.route.input + '&url=' + result.url;
      }
      return 'look?url=' + result.url + '&input=' + $scope.fli.route.input;
    };

    google.random().success(function (lucky) {
      $scope.lucky = lucky.word;
    });

    if ($scope.fli.route.input) {
      google.search($scope.fli.route.input)
        .success(function (search) {
          $scope.search = search || {};
        })
        .error(function () {
          yandex.search($scope.fli.route.input)
            .then(function (search) {
              $scope.search = search || {};
            });
        });

      google.autocomplete($scope.fli.route.input).success(function (auto) {
        $scope.suggested = auto[1] || [];
      });
    }

  });

