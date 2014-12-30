'use strict';
angular
  .module('fli.search')
  .controller('YandexCtrl', function ($rootScope, $scope, Yandex) {

    $scope.search = [];

    if ($rootScope.fli.route.input) {
      Yandex.search($rootScope.fli.route.input)
        .then(function (search) {
          $scope.search = search || [];
        });
    }

  });
