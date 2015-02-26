'use strict';
angular
  .module('fli.search')
  .controller('YandexCtrl', function ($rootScope, $scope, Yandex) {

    $scope.search = [];

    $scope.getURL = function(result) {
      return 'look?url=' + result.url + '&input=' + $rootScope.fli.route.input + '&type=short';
    };

    if ($rootScope.fli.route.input) {
      Yandex.search($rootScope.fli.route.input)
        .then(function (search) {
          $scope.search = search || [];
        });
    }

  });
