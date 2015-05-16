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

    $scope.href = function (result) {
      return 'look?input=' + $scope.fli.route.input + '&url=' + result.url;
    };

    if ($scope.fli.route.input) {
      google.search($scope.fli.route.input)
        .success(setResult)
        .error(function () {
          yandex.search($scope.fli.route.input)
            .then(setResult);
        });
    }

    google.random().success(function (lucky) {
      $scope.lucky = lucky.word;
    });

  });

