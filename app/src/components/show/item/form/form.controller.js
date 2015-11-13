'use strict';

angular
  .module('fli.show')
  .controller('show.item.form.ctrl',
  function ($scope) {

    var vm = this;

    $scope.showItem.post.action = 'click';
    $scope.showItem.post.look = 1;

    vm.show = function () {
      console.log('Show item: ' + $scope.fli.route.input, vm.post);
    };

  });

