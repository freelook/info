'use strict';

angular
  .module('fli.search')
  .controller('GoogleCtrl',
  function ($rootScope, $scope, Google) {

    $scope.search = {};
    $scope.suggested = [];

    function findContext(content) {
      var text = content || '',
        context = text.split('...')[0] || '';
      return context.trim() || '';
    }

    $scope.getURL = function(result) {
      return 'look?url=' + result.url + '&context=' + findContext(result.contentNoFormatting) + '&input=' + $rootScope.fli.route.input;
    };

    if ($rootScope.fli.route.input) {
      Google.search($rootScope.fli.route.input).success(function (search) {
        $scope.search = search || {};
        console.info($scope.search);
      });

      Google.autocomplete($rootScope.fli.route.input).success(function (auto) {
        $scope.suggested = auto[1] || [];
      });

    }

  });

