'use strict';

angular
  .module('fli.search')
  .controller('search.result.image.instagram.ctrl',
  function ($scope, $parse, instagram) {

    var vm = this;
    vm.items = [];
    vm.userId = $parse('instaUser.item.id')($scope) || '';

    function setResult(items) {
      vm.items = items || [];
    }

    if ($scope.fli.route.input) {
      if (vm.userId) {
        instagram.mediaByUserId(vm.userId)
          .then(setResult);
      } else {
        var tag = $scope.fli.route.input.trim().replace(/\s/g, '_');
        instagram.image(tag)
          .then(setResult);

      }

    }

  });

