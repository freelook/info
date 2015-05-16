'use strict';

angular
  .module('fli.search')
  .controller('search.result.ctrl',
  function ($scope, $mdMedia, google, yandex) {

    $scope.search = {};
    $scope.lucky = 'freedom';

    function setResult(search) {
      $scope.search = search || {};
    }

    $scope.href = function (url) {
      return 'look?input=' + $scope.fli.route.input + '&url=' + url;
    };

    if ($scope.fli.route.input) {
      google.search($scope.fli.route.input, $scope.fli.route.type)
        .success(setResult)
        .error(function () {
          if (!$scope.fli.route.type) {
            yandex.search($scope.fli.route.input)
              .then(setResult);
          }
        });
    }

    google.random().success(function (lucky) {
      $scope.lucky = lucky.word;
    });

  });

