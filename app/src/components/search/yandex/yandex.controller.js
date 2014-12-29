'use strict';
angular
  .module('fli.search')
  .controller('YandexCtrl', function ($rootScope, $scope, $sce, Yandex) {

    $scope.searchUrl = '';

    if ($rootScope.fli.route.input) {
      Yandex.search($rootScope.fli.route.input).then(function (url) {
        $scope.searchUrl = $sce.trustAsResourceUrl(url);
      });
    }

  });
