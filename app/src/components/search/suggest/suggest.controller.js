'use strict';
angular
  .module('fli.search')
  .controller('search.suggest.ctrl',
  function ($scope, google) {

    $scope.suggested = [];

    if ($scope.fli.route.input) {
      google.autocomplete($scope.fli.route.input).success(function (auto) {
        $scope.suggested = auto[1] || [];
      });
    } else {
      google.trends().success(function (trends) {
        if (trends && trends.responseData && trends.responseData.feed) {
          var entries = trends.responseData.feed.entries || [],
            entry = entries[0] || {},
            contentSnippet = entry.contentSnippet || '';
          $scope.suggested = contentSnippet.split('\n  ').slice(1);
        }
      });
    }

  });
