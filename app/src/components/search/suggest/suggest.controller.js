'use strict';
angular
  .module('fli.search')
  .controller('search.suggest.ctrl',
  function ($scope, url, google, suggest) {

    var vm = this;
    vm.suggested = [];
    vm.search = {};

    vm.href = function (suggest) {
      return url.href('search?', {input: suggest}, true);
    };

    function showTrends() {
      suggest().then(function (trends) {
        vm.suggested = trends || '';
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
