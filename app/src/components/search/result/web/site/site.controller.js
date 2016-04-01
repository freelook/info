'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.site.ctrl',
  function ($scope, google, content) {

    var vm = this;
    vm.search = {};

    function setResult(search) {
      vm.search = search || {};
    }

    if (content.name($scope.fli.route.sub).domain) {
      google.web(['site:', $scope.fli.route.sub, ' ', $scope.fli.route.input || ''].join(''))
        .success(setResult);
    }

  });

