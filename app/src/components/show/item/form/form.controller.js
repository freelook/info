'use strict';

angular
  .module('fli.show')
  .controller('show.item.form.ctrl',
  function ($scope, nav, user, toast, PROMO) {

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
      var _promo = $scope.showItem.post;
      _promo.user = user.authData().uid;
      PROMO.add(_promo)
        .then(function () {
          nav.goHome();
          toast.show('uix.toast.added');
        });
    };

    _init();

  });

