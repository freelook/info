'use strict';

angular
  .module('fli.search')
  .controller('search.result.image.instagram.ctrl',
  function ($scope, instagram) {

    var vm = this;
    vm.items = [];

    function setResult(items) {
      vm.items = items || [];
    }

    if ($scope.fli.route.input) {
      var tag = $scope.fli.route.input.trim().replace(/\s/g, '_');
      instagram.image(tag)
        .then(setResult);
    }

  });

