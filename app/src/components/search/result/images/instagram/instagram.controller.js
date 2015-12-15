'use strict';

angular
  .module('fli.search')
  .controller('search.result.images.instagram.ctrl',
  function ($scope, $parse, item, instagram) {

    var vm = this;
    vm.items = [];
    vm.href = item.href;
    vm.share = item.share;
    vm.search = item.search;
    vm.userId = $parse('instaUser.item.id')($scope) || '';

    function setResult(items) {
      console.log(items);
      vm.items = items || [];
    }

    if ($scope.fli.route.input) {
      if (vm.userId) {
        instagram.imageByUserId(vm.userId)
          .then(setResult);
      } else {
        var tag = $scope.fli.route.input.trim().replace(/\s/g, '_');
        instagram.imageByTag(tag)
          .then(setResult);
      }

    }

  });

