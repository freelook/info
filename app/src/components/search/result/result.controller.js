'use strict';

angular
  .module('fli.search')
  .controller('search.result.ctrl',
  function ($scope, CONFIG, google, yandex, facebook) {

    $scope.search = {};
    $scope.lucky = 'freelook';

    function setResult(search) {
      $scope.search = search || {};
    }

    $scope.href = function (url) {
      return CONFIG.ORIGIN + 'look?input=' + $scope.fli.route.input + '&url=' + url;
    };

    $scope.share = function (url, img, text) {
      var href = 'http://freelook.info/search?input=' + $scope.fli.route.input;
      if (img) {
        href += '&metaimg=' + img;
      }
      if (text) {
        href += '&metatext=' + text;
      }
      return facebook.share(href);
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

