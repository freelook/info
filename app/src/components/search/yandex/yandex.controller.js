'use strict';
angular
  .module('fli.search')
  .controller('YandexCtrl', function ($rootScope, $scope, Yandex, Google) {

    $scope.search = [];
    $scope.lucky = 'freestyle';

    $scope.getURL = function (result) {
      return 'look?url=' + result.url + '&input=' + $rootScope.fli.route.input + '&type=short';
    };

    Google.random().success(function (lucky) {
      $scope.lucky = lucky.word;
    });

    if ($rootScope.fli.route.input) {
      Yandex.search($rootScope.fli.route.input)
        .then(function (search) {
          $scope.search = search || [];
        });

      Google.autocomplete($rootScope.fli.route.input).success(function (auto) {
        $scope.suggested = auto[1] || [];
      });
    }

  });
