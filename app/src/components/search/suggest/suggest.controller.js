'use strict';
angular
  .module('fli.search')
  .controller('search.suggest.ctrl',
  function ($scope, item, google, suggest) {

    var vm = this;

    vm.href = function (suggest) {
      return item.href({input: suggest});
    };

    function showTrends() {
      suggest().then(function (trends) {
        vm.suggested = trends || [];
      });
    }

    if ($scope.fli.route.input) {
      google.autocomplete($scope.fli.route.input)
        .success(function (auto) {
          var suggested = auto[1] || [];
          if (!!suggested.length) {
            vm.suggested = suggested;
          } else {
            showTrends();
          }
        })
        .error(showTrends);
    } else {
      showTrends();
    }

  });
