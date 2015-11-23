'use strict';

angular
  .module('fli.show')
  .controller('show.item.form.ctrl',
  function ($scope, nav, user, toast, SHOW) {

    var vm = this;

    function _init() {
      if (!$scope.fli.user) {
        toast.needLogin();
      }
    }

    vm.total = function () {
      return $scope.showItem.post.amount * $scope.showItem.post.price;
    };

    vm.shareEnabled = function () {
      // handle post form errors
      return $scope.fli.user &&
        $scope.showItem.post.action &&
        $scope.showItem.post.amount &&
        vm.total() <= $scope.fli.user.get('looks');
    };

    vm.show = function () {
      SHOW.add($scope.showItem.post).then(function () {
        nav.goHome();
        toast.show('index.core.uix.toast.added');
      });
    };

    _init();

  });

