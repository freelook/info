'use strict';

angular
  .module('fli.show')
  .controller('show.item.form.ctrl',
  function ($scope, nav, user, toast, SHOW) {

    var vm = this;

    function _init() {
      user.init().catch(function () {
        toast.needLogin();
      });
    }

    vm.total = function () {
      return $scope.showItem.post.amount * $scope.showItem.post.price;
    };

    vm.shareEnabled = function () {
      return $scope.fli.user &&
        $scope.showItem.post.action &&
        $scope.showItem.post.amount &&
        $scope.showItem.post.img &&
        $scope.showItem.post.title &&
        $scope.showItem.post.content &&
        vm.total() <= +$scope.fli.user.looks;
    };

    vm.show = function () {
      SHOW.add($scope.showItem.post).then(function () {
        nav.goHome();
        toast.show('index.core.uix.toast.added');
      });
    };

    _init();

  });

