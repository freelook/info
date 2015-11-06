'use strict';

angular
  .module('fli.show')
  .controller('show.item.config.ctrl',
  function ($scope) {

    var vm = this;

    $scope.showItem.post.action = 'like';
    $scope.showItem.post.looks = 1;

    vm.show = function () {
      console.log('Show item: ' + $scope.fli.route.input, vm.post);
    };

  });

