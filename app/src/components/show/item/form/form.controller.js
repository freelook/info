'use strict';

angular
  .module('fli.show')
  .controller('show.item.form.ctrl',
  function ($scope, user, SHOW) {

    var vm = this;

    vm.total = function () {
      return $scope.showItem.post.amount * $scope.showItem.post.price;
    };

    vm.shareEnabled = function () {
      return $scope.fli.user &&
        $scope.showItem.post.action &&
        $scope.showItem.post.amount &&
        vm.total() <= $scope.fli.user.get('looks');
    };

    vm.show = function () {
      SHOW.add($scope.showItem.post).then(function () {
        user.init();
      });
    };

  });

